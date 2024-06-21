import React from 'react';
import { Link } from 'react-router-dom';

export function CreatorSignUp() {
    return (
        <div className="min-h-screen flex">
            <div className="w-2/3 flex items-center justify-center bg-white">
                <div className="max-w-md w-full space-y-8 p-10">
                    <div className="text-center">
                        <Link to={'/'}>
                            <img src="/Creator-assests/logo.png" alt="Logo" className="mx-auto mb-4" />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Get Started</h2>
                        <p className="mt-2 text-sm text-gray-600">Start your journey at RightClip</p>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <input id="first-name" name="first-name" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="First Name" />
                                </div>
                                <div className="w-1/2">
                                    <input id="last-name" name="last-name" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Last Name" />
                                </div>
                            </div>
                            <div>
                                <input id="industry" name="industry" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Industry" />
                            </div>
                            <div>
                                <input id="experience" name="experience" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Experience (in years)" />
                            </div>
                            <div>
                                <input id="email" name="email" type="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email ID" />
                            </div>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    +91
                                </span>
                                <input id="phone" name="phone" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0000000000" />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                CONTINUE
                            </button>
                        </div>
                        <div className="flex items-center justify-center text-sm">
                            <p className="text-gray-600">Already have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"><Link to={'/creator/signin'}>LOG IN</Link></a></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-1/3 hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0A0266] via-[#080068] to-[#004D95]">
            </div>
        </div>
    );
}
