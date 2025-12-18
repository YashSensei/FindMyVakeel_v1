// Email Verification Service using EmailJS
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Generate 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via EmailJS
export const sendVerificationOTP = async (
  userEmail: string,
  userName: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('=== EmailJS Debug Info ===');
    console.log('Public Key:', EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing');
    console.log('Service ID:', EMAILJS_SERVICE_ID || 'Missing');
    console.log('Template ID:', EMAILJS_TEMPLATE_ID || 'Missing');
    console.log('Sending to:', userEmail);
    console.log('OTP:', otp);
    
    if (!EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS Public Key is missing. Check VITE_EMAILJS_PUBLIC_KEY in .env file.');
    }
    
    if (!EMAILJS_SERVICE_ID) {
      throw new Error('EmailJS Service ID is missing. Check VITE_EMAILJS_SERVICE_ID in .env file.');
    }
    
    if (!EMAILJS_TEMPLATE_ID) {
      throw new Error('EmailJS Template ID is missing. Check VITE_EMAILJS_TEMPLATE_ID in .env file.');
    }

    const templateParams = {
      // Multiple email field names for compatibility with different template configs
      to_email: userEmail,
      email: userEmail,
      user_email: userEmail,
      recipient: userEmail,
      // Name fields
      to_name: userName,
      name: userName,
      user_name: userName,
      // OTP and app info
      otp_code: otp,
      otp: otp,
      code: otp,
      app_name: 'Find My Vakeel',
      validity: '10',
      message: `Your verification code is: ${otp}`,
    };

    console.log('Template params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('EmailJS Response:', response);

    if (response.status === 200) {
      return {
        success: true,
        message: 'Verification code sent successfully!',
      };
    } else {
      throw new Error(`EmailJS returned status: ${response.status}`);
    }
  } catch (error) {
    console.error('=== EmailJS Error ===');
    console.error('Error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

// Store OTP with expiry in localStorage (for demo - use backend in production)
export const storeOTP = (email: string, otp: string): void => {
  const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  localStorage.setItem(`otp_${email}`, JSON.stringify({ otp, expiry }));
};

// Verify OTP
export const verifyOTP = (email: string, enteredOTP: string): boolean => {
  const stored = localStorage.getItem(`otp_${email}`);
  if (!stored) return false;

  const { otp, expiry } = JSON.parse(stored);
  
  // Check if expired
  if (Date.now() > expiry) {
    localStorage.removeItem(`otp_${email}`);
    return false;
  }

  // Check if OTP matches
  if (otp === enteredOTP) {
    localStorage.removeItem(`otp_${email}`);
    return true;
  }

  return false;
};

// Mark email as verified
export const markEmailVerified = (email: string): void => {
  localStorage.setItem(`verified_${email}`, 'true');
};

// Check if email is verified
export const isEmailVerified = (email: string): boolean => {
  return localStorage.getItem(`verified_${email}`) === 'true';
};
