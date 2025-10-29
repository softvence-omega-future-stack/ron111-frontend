"use client";

import { useState } from 'react';
import { MapPin, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
    }
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-3">
            <MapPin className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-gray-800 font-semibold text-lg mb-1">RouteOptima</h1>
          <p className="text-gray-500 text-sm">Smart Job Scheduling Platform</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {!isSubmitted ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Forgot Password?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dispatcher@company.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm mb-4"
              >
                Send Reset Link
              </button>

              {/* Back to Login */}
               <Link
                  href="/login"
                  className="w-full flex items-center justify-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h2>
                <p className="text-sm text-gray-600 mb-6">
                  We&apos;ve sent a password reset link to <span className="font-medium text-gray-800">{email}</span>
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </p>

                {/* Resend Button */}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm mb-4"
                >
                  Resend Link
                </button>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">© 2025 RouteOptima. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}