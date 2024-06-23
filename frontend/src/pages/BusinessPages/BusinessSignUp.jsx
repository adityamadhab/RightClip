import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BusinessSignUp() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [company, setCompany] = useState('');
    const [noemployee, setNoemployee] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        
        try {
            const response = await axios.post('/business/signup', {
                firstname,
                lastname,
                company,
                noemployee: parseInt(noemployee),
                phone,
                email,
                password,
            });

            if (response.status === 201) {
                navigate('/business/success');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors.map(e => e.message));
            } else {
                setErrors(['An unexpected error occurred. Please try again.']);
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-2/3 flex items-center justify-center bg-white">
                <div className="max-w-md w-full space-y-8 p-10">
                    <div className="text-center">
                        <Link to={'/'}>
                            <img src="/Business-assests/logo.png" alt="Logo" className="mx-auto h-[80px]" />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Get Started</h2>
                        <p className="mt-2 text-sm text-gray-600">Expand your business at RightClip</p>
                    </div>
                    {errors.length > 0 && (
                        <div className="text-red-500 text-center">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <input
                                        name="firstName"
                                        type="text"
                                        required
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <input
                                        id="last-name"
                                        name="lastName"
                                        type="text"
                                        required
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    name="company"
                                    type="text"
                                    required
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div>
                                <input
                                    name="noemployee"
                                    type="text"
                                    required
                                    value={noemployee}
                                    onChange={(e) => setNoemployee(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Number of Employees"
                                />
                            </div>
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email ID"
                                />
                            </div>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    +91
                                </span>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="0000000000"
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
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
                                SIGN UP
                            </button>
                        </div>
                        <div className="flex items-center justify-center text-sm">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to={'/business/signin'} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    LOG IN
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-1/3 hidden lg:flex items-center justify-center bg-[#8FD8CF]"></div>
        </div>
    );
}
