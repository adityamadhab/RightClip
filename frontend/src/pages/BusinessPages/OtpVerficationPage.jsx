import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function OTPVerification() {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const [email] = useState(location.state?.email || ''); // Retrieve email state but keep it uneditable
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const response = await axios.post('/business/verify-otp', { email, otp });

            if (response.status === 200) {
                navigate('/business/success');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setErrors([err.response.data.msg]);
            } else {
                setErrors(['An unexpected error occurred. Please try again.']);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 flex items-center justify-center bg-white">
                <div className="max-w-md w-full space-y-8 p-10">
                    <div className="text-center">
                        <Link to={'/'}>
                            <img src="/Business-assests/logo.png" alt="Logo" className="mx-auto mb-4 h-[80px]" />
                        </Link>
                        <h2 className="mt-6 text-2xl text-gray-900">Verify OTP</h2>
                        <p className="mt-2 text-sm text-gray-600">Please enter the OTP sent to your email</p>
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
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    readOnly
                                    value={email}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="OTP"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:flex lg:w-1/3 items-center justify-center bg-[#8FD8CF]">
            </div>
        </div>
    );
}
