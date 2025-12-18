import express from 'express';
import { processLegalProblem, generateChatResponse } from '../services/aiService.js';
import { optionalAuth } from '../middleware/auth.js';
import { validateAIProblem, validateAIChat } from '../middleware/validate.js';

const router = express.Router();

// Process legal problem - AI analysis
router.post('/process', optionalAuth, validateAIProblem, async (req, res) => {
  try {
    const { problem } = req.body;

    const analysis = await processLegalProblem(problem);

    res.json({ analysis });
  } catch (error) {
    console.error('AI Process Error:', error);
    // Return fallback on error
    res.json({
      analysis: {
        processedProblem: req.body.problem || '',
        category: 'other',
        urgency: 'medium',
        keyFacts: ['Unable to process with AI - using original input'],
        suggestedActions: ['Consult with a legal expert'],
        estimatedComplexity: 'moderate'
      }
    });
  }
});

// Generate chat response
router.post('/chat', optionalAuth, validateAIChat, async (req, res) => {
  try {
    const { messages, caseContext } = req.body;

    const response = await generateChatResponse(messages, caseContext || {});

    res.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.json({
      response: 'I apologize, there was an error processing your request. Please try again.'
    });
  }
});

export default router;
