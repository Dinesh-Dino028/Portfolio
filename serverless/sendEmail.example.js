// Example serverless function (Node.js) to send contact form emails securely.
// This example works for AWS Lambda / Netlify Functions / Vercel Serverless (adjust handler as needed).
// It uses nodemailer with SMTP credentials provided via environment variables.

/*
Required environment variables:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- CONTACT_RECEIVER_EMAIL

Deploy notes:
- For Netlify create `netlify/functions/sendEmail.js` with the exported handler.
- For AWS Lambda wrap the handler accordingly and attach environment variables in the console.
*/

const nodemailer = require('nodemailer');

// Lambda/Netlify handler
exports.handler = async function (event, context) {
  try {
    // For Netlify functions, body is a string; parse JSON
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const { name, email, emailSubject, mobileNumber, message } = body || {};

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields (name, email, message).' })
      };
    }

    // Transport using SMTP (credentials from environment variables)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: emailSubject || `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${mobileNumber || 'N/A'}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: 'Email sent' })
    };

  } catch (err) {
    console.error('Send email error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
