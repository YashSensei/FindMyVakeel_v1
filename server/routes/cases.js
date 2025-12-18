import express from 'express';
import Case from '../models/Case.js';
import Lawyer from '../models/Lawyer.js';
import { auth } from '../middleware/auth.js';
import { processLegalProblem, matchLawyers } from '../services/aiService.js';

const router = express.Router();

// Create a new case (submit problem)
router.post('/', auth, async (req, res) => {
  try {
    const { problem, documents } = req.body;

    // Create case with original problem
    const newCase = new Case({
      user: req.user._id,
      originalProblem: problem,
      documents: documents || [],
      status: 'processing'
    });
    await newCase.save();

    // Process with AI
    const aiResult = await processLegalProblem(problem);

    // Update case with AI processed data
    newCase.processedProblem = aiResult.processedProblem;
    newCase.category = aiResult.category;
    newCase.urgency = aiResult.urgency;
    newCase.status = 'matching';
    await newCase.save();

    // Find suitable lawyers
    const availableLawyers = await Lawyer.find({
      isAvailable: true,
      specializations: newCase.category
    }).limit(20);

    if (availableLawyers.length > 0) {
      // Get AI matches
      const matches = await matchLawyers(
        {
          problem: newCase.processedProblem,
          category: newCase.category,
          urgency: newCase.urgency
        },
        availableLawyers.map(l => ({
          id: l._id,
          name: l.name,
          specializations: l.specializations,
          experience: l.experience,
          rating: l.rating,
          location: l.location,
          languages: l.languages
        }))
      );

      // Add matched lawyers to case
      newCase.matchedLawyers = matches.slice(0, 5).map(m => ({
        lawyer: m.lawyerId,
        matchScore: m.score,
        status: 'pending'
      }));
    }

    newCase.status = 'awaiting-response';
    await newCase.save();

    res.status(201).json({
      case: newCase,
      aiAnalysis: {
        processedProblem: aiResult.processedProblem,
        category: aiResult.category,
        urgency: aiResult.urgency,
        keyFacts: aiResult.keyFacts,
        suggestedActions: aiResult.suggestedActions
      }
    });
  } catch (error) {
    console.error('Case creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all cases for current user
router.get('/', auth, async (req, res) => {
  try {
    const cases = await Case.find({ user: req.user._id })
      .populate('matchedLawyers.lawyer')
      .populate('selectedLawyer')
      .sort({ createdAt: -1 });

    res.json({ cases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single case
router.get('/:id', auth, async (req, res) => {
  try {
    const caseData = await Case.findOne({
      _id: req.params.id,
      user: req.user._id
    })
      .populate('matchedLawyers.lawyer')
      .populate('selectedLawyer');

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.json({ case: caseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Select a lawyer for the case
router.post('/:id/select-lawyer', auth, async (req, res) => {
  try {
    const { lawyerId } = req.body;

    const caseData = await Case.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    // Verify lawyer is in matched list
    const isMatched = caseData.matchedLawyers.some(
      m => m.lawyer.toString() === lawyerId
    );

    if (!isMatched) {
      return res.status(400).json({ error: 'Lawyer not in matched list' });
    }

    caseData.selectedLawyer = lawyerId;
    caseData.status = 'in-progress';
    await caseData.save();

    await caseData.populate('selectedLawyer');

    res.json({ case: caseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add document to case
router.post('/:id/documents', auth, async (req, res) => {
  try {
    const { name, url, type } = req.body;

    const caseData = await Case.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    caseData.documents.push({ name, url, type });
    await caseData.save();

    res.json({ case: caseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update case status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;

    const caseData = await Case.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    );

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.json({ case: caseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
