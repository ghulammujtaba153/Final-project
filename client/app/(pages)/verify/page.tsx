"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '@/utils/apiConfig';
import { useRouter } from 'next/navigation';

export default function OTPVerification({ data }) {
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [message, setMessage] = useState('');
  const [resendAllowed, setResendAllowed] = useState(false);
  const router=useRouter();
  const  email=data?.email;

  // Timer countdown for resend option
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendAllowed(true);
    }
  }, [resendTimer]);

  useEffect(() => {
    const sendOTP = async () => {
      try {
        await axios.post('/api/verify/send-otp', { email });
        setMessage('OTP sent to your email');
      } catch (error) {
        setMessage('Failed to send OTP');
      }
    };
    sendOTP();
  }, []);

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/verify/verify-otp', { email, otp });
      setIsOtpValid(true);
      setMessage('OTP verified successfully');
      const registerPromise = axios.post(`${API_BASE_URL}/register`, data);
    
      toast.promise(registerPromise, {
        loading: 'Registering user...',
        success: 'User registered successfully',
        error: 'Error registering user'
      });
      router.replace("/login");

    } catch (err) {
      setIsOtpValid(false);
      setMessage('Invalid OTP or OTP expired');
    }
  };

  // Resend OTP handler
  const handleResend = async () => {
    try {
      await axios.post('api/verify/resend-otp', { email });
      setResendTimer(60);
      setResendAllowed(false);
      setMessage('OTP resent to email');
    } catch (err) {
      setMessage('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Your OTP</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your OTP"
            required
            className="border border-gray-300 rounded-lg p-3 text-center text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Verify OTP
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${isOtpValid ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          {resendAllowed ? (
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">
              Resend available in {resendTimer}s
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
