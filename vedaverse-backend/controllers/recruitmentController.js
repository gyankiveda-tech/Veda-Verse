const nodemailer = require('nodemailer');

exports.submitApplication = async (req, res) => {
  const { fullName, email, role, portfolioLink, coverLetter } = req.body;

  try {
    // 1. Email Transporter Setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Vedaverse Premium Email Template
    const mailOptions = {
      from: `Vedaverse Studio Portal <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Yeh email tumhare hi inbox mein aayega
      replyTo: email, // Jisse tum direct reply kar sako applicant ko
      subject: `🚨 NEW APPLICATION: ${role} - ${fullName}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background-color: #030303; color: #f4f0eb; padding: 30px; border: 1px solid #c5a059;">
          <h4 style="color: #c5a059; letter-spacing: 3px; font-size: 12px; margin-bottom: 5px;">VEDAVERSE RECRUITMENT PORTAL</h4>
          <h2 style="margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 15px; font-weight: normal;">New Candidate Application</h2>
          
          <p><strong>Role Applied For:</strong> <span style="color: #c5a059;">${role}</span></p>
          <p><strong>Candidate Name:</strong> ${fullName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #00f2ff;">${email}</a></p>
          <p><strong>Portfolio Link:</strong> <a href="${portfolioLink}" target="_blank" style="color: #00f2ff;">${portfolioLink}</a></p>
          
          <div style="background-color: #0a0a0a; padding: 20px; margin-top: 25px; border-left: 3px solid #c5a059;">
            <h4 style="color: #777; margin-top: 0; font-size: 12px; letter-spacing: 2px;">DIRECTOR'S NOTE / COVER LETTER:</h4>
            <p style="line-height: 1.6; font-size: 14px;">${coverLetter || 'No cover letter provided.'}</p>
          </div>
          
          <p style="font-size: 11px; color: #555; text-align: center; margin-top: 40px;">System Auto-Generated Alert • Vedaverse Studio</p>
        </div>
      `,
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Application submitted successfully! Welcome to the queue.' });
  } catch (error) {
    console.error('Error sending application email:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application. Please try again.' });
  }
};