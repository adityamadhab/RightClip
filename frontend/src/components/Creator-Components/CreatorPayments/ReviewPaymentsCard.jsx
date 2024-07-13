import React, { useState } from 'react';
import axios from 'axios';

export default function CreReviewPaymentCard({ project, onClose, onPaymentSuccess }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [holderName, setHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleIfscCodeChange = (e) => {
        setIfscCode(e.target.value);
    };

    const handleHolderNameChange = (e) => {
        setHolderName(e.target.value);
    };

    const handleBankNameChange = (e) => {
        setBankName(e.target.value);
    };

    const handlePaymentSubmit = async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await axios.post(
                '/payment/submit',
                { 
                    projectId: project._id, 
                    projectName: project.projectName,
                    accountNumber,
                    ifscCode,
                    holderName,
                    bankName
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('CreToken'),
                    },
                }
            );
            console.log('Payment Response:', response.data);
            onClose();
            onPaymentSuccess();
        } catch (error) {
            console.error('Error making payment:', error);
            setError('Failed to submit payment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[400px]">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>
                <div className="text-center">
                    <p className="text-lg mb-4">Payment Details for project {project.projectName}</p>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        placeholder="Enter Account Number"
                        className="border border-gray-300 rounded w-full p-2 mb-4"
                    />
                    <input
                        type="text"
                        value={ifscCode}
                        onChange={handleIfscCodeChange}
                        placeholder="Enter IFSC Code"
                        className="border border-gray-300 rounded w-full p-2 mb-4"
                    />
                    <input
                        type="text"
                        value={holderName}
                        onChange={handleHolderNameChange}
                        placeholder="Enter Account Holder Name"
                        className="border border-gray-300 rounded w-full p-2 mb-4"
                    />
                    <input
                        type="text"
                        value={bankName}
                        onChange={handleBankNameChange}
                        placeholder="Enter Bank Name"
                        className="border border-gray-300 rounded w-full p-2 mb-4"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        onClick={handlePaymentSubmit}
                        className="bg-blue-500 text-white rounded w-full p-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Details'}
                    </button>
                </div>
            </div>
        </div>
    );
}
