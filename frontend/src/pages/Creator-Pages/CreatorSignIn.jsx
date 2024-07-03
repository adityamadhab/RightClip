import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function CreatorSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/creator/signin', { email, password });

      if (response.data.user.approval) {
        await localStorage.setItem('token', response.data.token);
        navigate('/creator/dashboard');
      } else {
        navigate('/creator/submit');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-2/3 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8 p-10">
          <div className="text-center">
            <img src="/Creator-assests/logo.png" alt="Logo" className="mx-auto mb-4" />
            <h2 className="mt-6 text-2xl text-gray-900">Log In To Your Account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email ID</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
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
                <a href="#" className="font-medium text-black hover:text-indigo-500">Forgot password?</a>
              </div>
              <div className="text-sm">
                <Link to={'/creator/signup'} className="font-medium text-black hover:text-indigo-500">Don't have an account?</Link>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="font-medium text-black hover:text-indigo-500">T&C</a>
              <a href="#" className="font-medium text-black hover:text-indigo-500">Privacy</a>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/3 bg-gradient-to-br from-[#0A0266] via-[#080068] to-[#004D95] hidden lg:flex items-center justify-center">
      </div>
    </div>
  );
}
