import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Original problem as typed by user (messy)
  originalProblem: {
    type: String,
    required: true
  },
  // AI-cleaned legal explanation
  processedProblem: {
    type: String,
    default: ''
  },
  // AI-detected category
  category: {
    type: String,
    enum: [
      'corporate',
      'intellectual-property',
      'employment',
      'contracts',
      'compliance',
      'fundraising',
      'disputes',
      'real-estate',
      'tax',
      'other'
    ],
    default: 'other'
  },
  // AI-detected urgency level
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  // Documents uploaded by user
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Matched lawyers (3-5 best matches)
  matchedLawyers: [{
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lawyer'
    },
    matchScore: Number,
    status: {
      type: String,
      enum: ['pending', 'interested', 'declined'],
      default: 'pending'
    },
    responseMessage: String,
    respondedAt: Date
  }],
  // Selected lawyer by user
  selectedLawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  status: {
    type: String,
    enum: [
      'draft',
      'processing',      // AI is processing
      'matching',        // Finding lawyers
      'awaiting-response', // Waiting for lawyer responses
      'matched',         // Lawyers responded, user to choose
      'in-progress',     // User selected lawyer, work ongoing
      'completed',
      'cancelled'
    ],
    default: 'draft'
  },
  // Payment info
  payment: {
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    },
    paidAt: Date,
    transactionId: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

caseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Case', caseSchema);
