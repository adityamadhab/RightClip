import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <img src="/Business-assests/sidelogo.png" alt="Success" className="mb-4" />
                <h2 className="text-xl font-bold">CONGRATES</h2>
                <p className="mb-4">Your order has been placed</p>
                <Link to={'/business/dashboard/pending'}
                    onClick={onClose}
                    className="mt-4 py-2 px-4 bg-blue-900 text-white rounded-xl hover:bg-blue-600"
                >
                    Go to Assignments
                </Link>
            </div>
        </div>
    );
};

export default SuccessPopup;

