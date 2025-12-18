import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  avatar: String,
  // Professional details
  barCouncilId: String,
  experience: {
    type: Number,  // Years of experience
    default: 0
  },
  specializations: [{
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
      'startup-advisory',
      'mergers-acquisitions',
      'banking-finance'
    ]
  }],
  languages: [{
    type: String,
    default: ['English', 'Hindi']
  }],
  location: {
    city: String,
    state: String
  },
  // Ratings and reviews
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  // Pricing
  consultationFee: {
    type: Number,
    default: 0
  },
  hourlyRate: {
    type: Number,
    default: 0
  },
  // Availability
  isAvailable: {
    type: Boolean,
    default: true
  },
  responseTime: {
    type: String,
    default: '2-4 hours'
  },
  // Stats
  casesHandled: {
    type: Number,
    default: 0
  },
  successRate: {
    type: Number,
    default: 95
  },
  bio: String,
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Lawyer', lawyerSchema);
