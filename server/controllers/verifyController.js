import { createTransport } from 'nodemailer';
import { generate } from 'otp-generator';
import express from 'express';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Store OTPs in memory for demo, but in production, use a database.
let otpStore = {};

dotenv.config();

const transporter = createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS  // your email password or app password
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});


const verifyRouter = express.Router();

// Generate OTP and send email
async function generateAndSendOTP(email) {
  try {
    const otp = generate(6, { upperCase: false, specialChars: false });
    const expirationTime = Date.now() + 60000; // OTP valid for 60 seconds

    // Store OTP and expiration
    otpStore[email] = { otp, expirationTime };

    // Set up Nodemailer
    let transporter = createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password or app password
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });
    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 60 seconds.`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);  // Log success
  } catch (error) {
    console.error('Error in generateAndSendOTP:', error);  // Log the error
    throw new Error('Failed to send OTP');  // Throw error to be caught by caller
  }
}


// API to handle OTP generation and sending email
verifyRouter.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    await generateAndSendOTP(email);
    res.status(200).send({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to send OTP' });
  }
});

// API to verify OTP
verifyRouter.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).send({ message: 'No OTP found for this email' });
  }

  const { otp: storedOtp, expirationTime } = otpStore[email];

  if (Date.now() > expirationTime) {
    return res.status(400).send({ message: 'OTP expired' });
  }

  if (storedOtp === otp) {
    res.status(200).send({ message: 'OTP verified successfully' });
    delete otpStore[email]; // Clear OTP after verification
  } else {
    res.status(400).send({ message: 'Invalid OTP' });
  }
});

// API to resend OTP
verifyRouter.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  

  try {
    await generateAndSendOTP(email);
    res.status(200).send({ message: 'OTP resent to email' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to resend OTP' });
  }
});


// Forgot Password - Send reset link
verifyRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Reset token valid for 1 hour
    );

    // Create reset URL
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email with reset link
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });

    return res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    return res.status(500).json({ message: 'Error sending reset email' });
  }
});



// Reset Password - Update the password
verifyRouter.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Error resetting password' });
  }
});


export default verifyRouter;
