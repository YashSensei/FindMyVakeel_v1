/**
 * Input validation middleware for Find My Vakeel API
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports Indian and international formats)
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

// Sanitize string input (remove potential XSS)
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Validation error response
const validationError = (res, message, field = null) => {
  return res.status(400).json({
    error: 'Validation failed',
    message,
    field
  });
};

/**
 * Validate registration input
 */
export const validateRegister = (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // Name validation
  if (!name || typeof name !== 'string') {
    return validationError(res, 'Name is required', 'name');
  }
  if (name.trim().length < 2) {
    return validationError(res, 'Name must be at least 2 characters', 'name');
  }
  if (name.trim().length > 100) {
    return validationError(res, 'Name must be less than 100 characters', 'name');
  }

  // Email validation
  if (!email || typeof email !== 'string') {
    return validationError(res, 'Email is required', 'email');
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return validationError(res, 'Please provide a valid email address', 'email');
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    return validationError(res, 'Password is required', 'password');
  }
  if (password.length < 6) {
    return validationError(res, 'Password must be at least 6 characters', 'password');
  }
  if (password.length > 128) {
    return validationError(res, 'Password must be less than 128 characters', 'password');
  }

  // Phone validation (optional but must be valid if provided)
  if (phone && typeof phone === 'string' && phone.trim() !== '') {
    if (!PHONE_REGEX.test(phone.trim())) {
      return validationError(res, 'Please provide a valid phone number', 'phone');
    }
  }

  // Sanitize inputs
  req.body.name = sanitizeString(name);
  req.body.email = email.trim().toLowerCase();
  req.body.phone = phone ? sanitizeString(phone) : undefined;

  next();
};

/**
 * Validate login input
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Email validation
  if (!email || typeof email !== 'string') {
    return validationError(res, 'Email is required', 'email');
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return validationError(res, 'Please provide a valid email address', 'email');
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    return validationError(res, 'Password is required', 'password');
  }

  // Sanitize
  req.body.email = email.trim().toLowerCase();

  next();
};

/**
 * Validate profile update input
 */
export const validateProfileUpdate = (req, res, next) => {
  const { name, phone, avatar } = req.body;

  // Name validation (if provided)
  if (name !== undefined) {
    if (typeof name !== 'string') {
      return validationError(res, 'Name must be a string', 'name');
    }
    if (name.trim().length < 2) {
      return validationError(res, 'Name must be at least 2 characters', 'name');
    }
    if (name.trim().length > 100) {
      return validationError(res, 'Name must be less than 100 characters', 'name');
    }
    req.body.name = sanitizeString(name);
  }

  // Phone validation (if provided)
  if (phone !== undefined && phone !== null && phone !== '') {
    if (typeof phone !== 'string') {
      return validationError(res, 'Phone must be a string', 'phone');
    }
    if (!PHONE_REGEX.test(phone.trim())) {
      return validationError(res, 'Please provide a valid phone number', 'phone');
    }
    req.body.phone = sanitizeString(phone);
  }

  // Avatar validation (if provided)
  if (avatar !== undefined) {
    if (typeof avatar !== 'string') {
      return validationError(res, 'Avatar must be a string URL or base64 data', 'avatar');
    }
    // Basic URL/base64 validation
    if (avatar && !avatar.startsWith('http://') && !avatar.startsWith('https://') && !avatar.startsWith('data:image/')) {
      return validationError(res, 'Avatar must be a valid URL or base64 data URL', 'avatar');
    }
    // Allow larger size for base64 images (up to ~3MB base64 encoded)
    if (avatar.length > 5000000) {
      return validationError(res, 'Avatar data is too large (max 3MB)', 'avatar');
    }
  }

  next();
};

/**
 * Validate AI problem processing input
 */
export const validateAIProblem = (req, res, next) => {
  const { problem } = req.body;

  if (!problem || typeof problem !== 'string') {
    return validationError(res, 'Problem description is required', 'problem');
  }

  if (problem.trim().length < 10) {
    return validationError(res, 'Problem description must be at least 10 characters', 'problem');
  }

  if (problem.length > 10000) {
    return validationError(res, 'Problem description must be less than 10000 characters', 'problem');
  }

  req.body.problem = sanitizeString(problem);

  next();
};

/**
 * Validate AI chat input
 */
export const validateAIChat = (req, res, next) => {
  const { messages, caseContext } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return validationError(res, 'Messages array is required', 'messages');
  }

  if (messages.length === 0) {
    return validationError(res, 'At least one message is required', 'messages');
  }

  if (messages.length > 50) {
    return validationError(res, 'Too many messages in conversation', 'messages');
  }

  // Validate each message
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg.role || !['user', 'assistant', 'system'].includes(msg.role)) {
      return validationError(res, `Invalid role in message ${i + 1}`, 'messages');
    }
    if (!msg.content || typeof msg.content !== 'string') {
      return validationError(res, `Invalid content in message ${i + 1}`, 'messages');
    }
    if (msg.content.length > 5000) {
      return validationError(res, `Message ${i + 1} is too long`, 'messages');
    }
    // Sanitize message content
    messages[i].content = sanitizeString(msg.content);
  }

  // Validate caseContext if provided
  if (caseContext !== undefined && caseContext !== null) {
    if (typeof caseContext !== 'object') {
      return validationError(res, 'Case context must be an object', 'caseContext');
    }
  }

  next();
};

export default {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateAIProblem,
  validateAIChat
};
