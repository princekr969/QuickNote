'use client'
import { useState } from 'react';
import Link from 'next/link';
import SignUpForm from '@/app/components/form/SignUpForm';
import OtpForm from '@/app/components/form/OtpForm';
import '@/app/globals.css'

export default function SignUp() {

const [otpSent, setOtpSent] = useState(false);

return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8">
                    <Link href="/">
                        <span className="inline-flex items-center justify-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {otpSent ? 'Verify OTP' : 'Create Account'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {otpSent 
                            ? 'We have sent a 6-digit code to your email' 
                            : 'Join QuickNote to start organizing your thoughts'
                        }
                    </p>
                </div>
                {otpSent ? (
                    <OtpForm setOtpSent={setOtpSent} />
                ) : (
                    <SignUpForm setOtpSent={setOtpSent} />
                )}
                {!otpSent && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/signin">
                                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Sign in
                                </span>
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
);
}