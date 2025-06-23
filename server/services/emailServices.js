const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // For custom SMTP, use this instead:
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT || 587,
    // secure: process.env.SMTP_SECURE === 'true',
  });
};

// Generate admin notification email HTML
const generateAdminEmailHTML = (contactData) => {
  const { name, email, subject, message } = contactData;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
      <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1e293b; margin-top: 0; border-bottom: 3px solid #60a5fa; padding-bottom: 15px;">
          🎯 New Contact Form Submission
        </h2>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #60a5fa; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 20px;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            <strong>Quick Reply:</strong> <a href="mailto:${email}?subject=Re: ${subject}" style="color: #60a5fa;">Click here to reply</a><br>
            <strong>Received:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      </div>
    </div>
  `;
};

// Generate user auto-reply email HTML
const generateUserEmailHTML = (contactData) => {
  const { name, subject, message } = contactData;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
      <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #60a5fa; margin-top: 0; border-bottom: 3px solid #60a5fa; padding-bottom: 15px;">
          ✨ Thank You for Reaching Out!
        </h2>
        
        <p style="color: #374151; line-height: 1.6; font-size: 16px;">Hi ${name},</p>
        
        <p style="color: #374151; line-height: 1.6;">
          Thank you for contacting me through my portfolio website! I've received your message 
          and really appreciate you taking the time to reach out.
        </p>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">📝 Your Message Summary</h3>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #60a5fa;">
            <p style="margin: 0; color: #374151; font-style: italic;">
              "${message.length > 100 ? message.substring(0, 100) + '...' : message}"
            </p>
          </div>
        </div>
        
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">⚡ What happens next?</h3>
          <p style="color: #1e40af; margin: 8px 0; line-height: 1.5;">
            I'll review your message and get back to you as soon as possible, usually within 24 hours. 
            I'm excited to connect and discuss your project or opportunity!
          </p>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">
          In the meantime, feel free to check out my other projects on 
          <a href="https://github.com/MReyes1241" style="color: #60a5fa; text-decoration: none;">GitHub</a> or 
          connect with me on <a href="https://linkedin.com/in/manuel-reyes-jr-swe" style="color: #60a5fa; text-decoration: none;">LinkedIn</a>.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #374151; line-height: 1.6; margin-bottom: 5px;">
            Best regards,
          </p>
          <p style="color: #1e293b; font-weight: 600; font-size: 18px; margin: 0;">
            Manuel Reyes Jr.
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">
            Software Engineer
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            This is an automated response. Please don't reply to this email.
          </p>
        </div>
      </div>
    </div>
  `;
};

// Main function to send contact emails
const sendContactEmails = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const transporter = createTransporter();
  
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `🎯 New Contact: ${subject}`,
    html: generateAdminEmailHTML(contactData),
    replyTo: email
  };
  
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `✨ Thanks for reaching out - ${subject}`,
    html: generateUserEmailHTML(contactData)
  };
  
  try {
    console.log('📨 Preparing to send emails...');
    console.log('Admin email will be sent to:', adminMailOptions.to);
    console.log('Using email account:', process.env.EMAIL_USER);

    const results = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('📬 Admin email result:', results[0]);
    console.log('📤 User email result:', results[1]);

    if (results[0].status === 'rejected') {
      console.error('❌ Failed to send admin notification:', results[0].reason);
      throw new Error('Failed to send notification email');
    }

    if (results[1].status === 'rejected') {
      console.warn('⚠️ Failed to send user confirmation:', results[1].reason);
    }

    console.log(`✅ Contact form processed: ${name} <${email}>`);

  } catch (error) {
    console.error('💥 Email sending error:', error);
    throw error;
  }

};

module.exports = {
  sendContactEmails,
  createTransporter
};