# EmailJS Setup Guide for Email Verification

This guide will walk you through setting up EmailJS to enable email verification in Find My Vakeel.

## Table of Contents
1. [Create EmailJS Account](#1-create-emailjs-account)
2. [Connect Email Service](#2-connect-email-service)
3. [Create Email Template](#3-create-email-template)
4. [Get Your Credentials](#4-get-your-credentials)
5. [Configure Environment Variables](#5-configure-environment-variables)
6. [Test the Integration](#6-test-the-integration)

---

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Choose one of the following signup methods:
   - Email & Password
   - Google Account
   - GitHub Account
4. Verify your email address (if using email signup)
5. You'll be redirected to the EmailJS dashboard

> **Free Tier:** EmailJS free plan includes 200 emails/month, which is sufficient for testing and small-scale use.

---

## 2. Connect Email Service

EmailJS needs to connect to an email service to send emails. You have several options:

### Option A: Gmail (Recommended for Testing)

1. In the EmailJS dashboard, click **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with your Gmail account
6. Allow EmailJS to access your Gmail
7. Give your service a name (e.g., "Find My Vakeel Gmail")
8. **Copy the Service ID** (you'll need this later - it looks like `service_xxxxxxx`)
9. Click **"Create Service"**

> **Important:** If using Gmail, you may need to enable "Less secure app access" or create an App Password if you have 2FA enabled.

### Option B: Other Email Providers

EmailJS also supports:
- **Outlook/Office365**: Good for business emails
- **Yahoo**: Alternative free option
- **Custom SMTP**: Use your own email server
- **SendGrid, Mailgun, etc.**: Professional email services

The setup process is similar - select your provider, authenticate, and get the Service ID.

---

## 3. Create Email Template

Now create the email template that will be sent to users:

1. In the EmailJS dashboard, click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Configure the template:

### Template Settings
- **Template Name**: `Email Verification OTP`
- **Template ID**: Copy this ID (it looks like `template_xxxxxxx`) - you'll need it later

### Email Content

**Subject Line:**
```
Verify your Find My Vakeel account
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #C17D4A 0%, #A85C2F 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }
        .otp-code {
            background: white;
            border: 2px dashed #C17D4A;
            padding: 20px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #C17D4A;
            margin: 20px 0;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Find My Vakeel</h1>
            <p>Email Verification</p>
        </div>
        <div class="content">
            <p>Hello {{to_name}},</p>
            
            <p>Thank you for registering with Find My Vakeel! To complete your registration, please verify your email address using the code below:</p>
            
            <div class="otp-code">
                {{otp_code}}
            </div>
            
            <p><strong>This code will expire in {{validity}} minutes.</strong></p>
            
            <p>If you didn't request this verification, please ignore this email.</p>
            
            <p>Best regards,<br>
            The Find My Vakeel Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Find My Vakeel. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### Template Variables

Make sure these variables are configured (they should auto-populate when you paste the HTML):
- `{{to_name}}` - Recipient's name
- `{{to_email}}` - Recipient's email address
- `{{otp_code}}` - The 6-digit verification code
- `{{app_name}}` - Application name (optional)
- `{{validity}}` - OTP validity time in minutes

4. Click **"Save"** at the top right

---

## 4. Get Your Credentials

You need three pieces of information:

### A. Public Key (API Key)

1. Click on **"Account"** in the left sidebar (or your profile icon)
2. Go to the **"API Keys"** tab
3. Find your **Public Key** (it looks like a long string of characters)
4. Click **"Copy"** next to the Public Key

### B. Service ID

1. Go to **"Email Services"** in the left sidebar
2. Find the service you created in Step 2
3. Copy the **Service ID** (format: `service_xxxxxxx`)

### C. Template ID

1. Go to **"Email Templates"** in the left sidebar
2. Find the template you created in Step 3
3. Copy the **Template ID** (format: `template_xxxxxxx`)

---

## 5. Configure Environment Variables

Now add these credentials to your project:

1. Open your project folder: `c:\Users\yasha\OneDrive\Desktop\Axsyn_Tech\axsyn-tech-launchpad`

2. Look for a file named `.env` in the root directory
   - If it doesn't exist, create a new file named `.env`

3. Add these three lines to the `.env` file:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
```

4. Replace the placeholder values with your actual credentials from Step 4:
   - Replace `your_public_key_here` with your Public Key
   - Replace `service_xxxxxxx` with your Service ID
   - Replace `template_xxxxxxx` with your Template ID

### Example `.env` file:
```env
VITE_EMAILJS_PUBLIC_KEY=3xAmP1eK3yAbCd123456789
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
```

5. **Important:** Save the file and restart your development server for changes to take effect

---

## 6. Test the Integration

Now let's test if everything is working:

### Start the Development Server

1. Stop your current dev server (if running) by pressing `Ctrl+C` in the terminal
2. Start it again:
   ```bash
   npm run dev
   ```

### Test Registration Flow

1. Open your app in the browser (usually `http://localhost:8080`)
2. Click **"Get Started"** or **"Sign Up"**
3. Fill in the registration form with a **real email address** (use your own email for testing)
4. Click **"Create Account"**
5. You should see a success message: "Verification code sent!"
6. Check your email inbox (and spam folder) for the verification email
7. Copy the 6-digit code from the email
8. Paste or type the code in the verification screen
9. Click **"Verify Email"**
10. If successful, you'll be redirected to the dashboard

### Troubleshooting

**"Failed to send verification email"**
- Check if your `.env` file has the correct credentials
- Verify that you've restarted the dev server after adding credentials
- Check EmailJS dashboard → Usage to see if the email was sent

**Email not received**
- Check your spam/junk folder
- Verify the email address is correct
- Check EmailJS dashboard → Email History to see delivery status
- If using Gmail, check if "Less secure app access" is enabled

**"Invalid or expired OTP"**
- OTP expires after 10 minutes - request a new code
- Make sure you're copying the code correctly (no extra spaces)
- Clear browser localStorage and try again

**Console errors about environment variables**
- Ensure `.env` file is in the root directory (same level as `package.json`)
- Variable names must start with `VITE_` for Vite projects
- No spaces around the `=` sign
- Restart dev server after changes

---

## Important Notes

### Security Considerations

⚠️ **Current Implementation (Demo)**
- OTP is stored in browser's localStorage
- Suitable for testing and demo purposes only

✅ **Production Recommendations**
- Store OTPs in your backend database (MongoDB)
- Add rate limiting to prevent spam
- Implement IP-based restrictions
- Use backend API to verify OTP instead of client-side
- Add email verification status to user model
- Consider using JWT tokens for verification links as an alternative

### EmailJS Limitations

**Free Plan:**
- 200 emails/month
- EmailJS branding in emails
- Limited support

**Paid Plans:** (starting at $15/month)
- 1,000+ emails/month
- Remove branding
- Priority support
- Custom SMTP

### Alternative Solutions for Production

For production apps with high volume:
- **SendGrid**: 100 emails/day free, then paid plans
- **AWS SES**: $0.10 per 1,000 emails
- **Mailgun**: 5,000 emails/month free
- **Twilio SendGrid**: Robust email infrastructure

---

## Support & Resources

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Dashboard**: https://dashboard.emailjs.com/
- **EmailJS Support**: https://www.emailjs.com/contact/

If you encounter issues:
1. Check the browser console for error messages
2. Review EmailJS dashboard → Email History
3. Verify all three credentials are correct in `.env`
4. Ensure dev server was restarted after adding credentials

---

## Next Steps

✅ **What's Implemented:**
- Email verification component with OTP input
- Automatic email sending on registration
- OTP validation with expiry (10 minutes)
- Resend code functionality
- Integration with registration flow

🔜 **Recommended Enhancements:**
- Move OTP storage to backend API
- Add rate limiting (max 3 OTP requests per hour)
- Add email verification status to user profile
- Implement "remember this device" functionality
- Add SMS verification as alternative

---

**Need Help?** If you run into any issues, check the troubleshooting section or review the EmailJS dashboard for detailed logs.
