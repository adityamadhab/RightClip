import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function BusinessSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');

        try {
            const response = await axios.post('/business/signin', {
                email,
                password,
            });

            if (response.status === 200) {
                await localStorage.setItem('BusToken', response.data.token);
                navigate('/business/dashboard');
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
                            <img src="/Business-assests/logo.png" alt="Logo" className="mx-auto mb-4 h-[80px]" />
                        </Link>
                        <h2 className="mt-6 text-2xl text-gray-900">Log In To Your Account</h2>
                    </div>
                    {errors && (
                        <div className="text-red-500 text-center">
                            <p>{errors}</p>
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email ID"
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                LOG IN
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <div className="font-medium text-black hover:text-indigo-500">Forgot password?</div>
                            </div>
                            <div className="text-sm">
                                <Link to={'/business/signup'} className="font-medium text-black hover:text-indigo-500">
                                    Don't have an account?
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="font-medium text-black hover:text-indigo-500">T&C</div>
                            <div className="font-medium text-black hover:text-indigo-500">Privacy</div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-1/3 bg-[#8FD8CF] hidden lg:flex items-center justify-center"></div>
        </div>
    );
}
