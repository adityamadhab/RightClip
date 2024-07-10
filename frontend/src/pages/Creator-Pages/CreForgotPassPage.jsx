import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function CreForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        setMessage('');

        try {
            const response = await axios.post('/creator/forgot-password', { email });
            if (response.status === 200) {
                setMessage('OTP has been sent to your email.');
                setStep(2);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setErrors(err.response.data.msg);
            } else {
                setErrors('An unexpected error occurred. Please try again.');
            }
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setErrors('');
        setMessage('');

        try {
            const response = await axios.post('/creator/reset-password', { email, otp, newPassword });
            if (response.status === 200) {
                setMessage('Password has been reset successfully.');
                setStep(3);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setErrors(err.response.data.msg);
            } else {
                setErrors('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-2/3 flex items-center justify-center bg-white">
                <div className="max-w-md w-full space-y-8 p-10">
                    <div className="text-center">
                        <Link to={'/'}>
                            <img src="/Business-assets/logo.png" alt="Logo" className="mx-auto mb-4 h-[80px]" />
                        </Link>
                        <h2 className="mt-6 text-2xl text-gray-900">{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>
                    </div>
                    {errors && <div className="text-red-500 text-center">{errors}</div>}
                    {message && <div className="text-green-500 text-center">{message}</div>}
                    {step === 1 && (
                        <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Email ID"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="OTP"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="New Password"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    )}
                    {step === 3 && (
                        <div className="text-center">
                            <p>Your password has been reset successfully. You can now <Link to={'/creator/signin'} className='text-blue-400 hover:text-blue-600'>log in</Link> with your new password.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/3 bg-[#8FD8CF] hidden lg:flex items-center justify-center"></div>
        </div>
    );
}
