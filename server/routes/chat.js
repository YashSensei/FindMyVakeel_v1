import express from 'express';
import Message from '../models/Message.js';
import Case from '../models/Case.js';
import { auth } from '../middleware/auth.js';
import { generateChatResponse } from '../services/aiService.js';

const router = express.Router();

// Get messages for a case
router.get('/:caseId', auth, async (req, res) => {
  try {
    const caseData = await Case.findOne({
      _id: req.params.caseId,
      user: req.user._id
    });

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const messages = await Message.find({ case: req.params.caseId })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a message
router.post('/:caseId', auth, async (req, res) => {
  try {
    const { content, attachments } = req.body;

    const caseData = await Case.findOne({
      _id: req.params.caseId,
      user: req.user._id
    });

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const message = new Message({
      case: req.params.caseId,
      sender: req.user._id,
      senderType: req.user.role === 'lawyer' ? 'lawyer' : 'client',
      content,
      attachments: attachments || []
    });

    await message.save();
    await message.populate('sender', 'name avatar');

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get AI assistance for a case
router.post('/:caseId/ai-assist', auth, async (req, res) => {
  try {
    const { question } = req.body;

    const caseData = await Case.findOne({
      _id: req.params.caseId,
      user: req.user._id
    });

    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }

    const response = await generateChatResponse(
      [{ role: 'user', content: question }],
      {
        problem: caseData.processedProblem,
        category: caseData.category,
        urgency: caseData.urgency
      }
    );

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark messages as read
router.patch('/:caseId/read', auth, async (req, res) => {
  try {
    await Message.updateMany(
      {
        case: req.params.caseId,
        sender: { $ne: req.user._id },
        read: false
      },
      { read: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
