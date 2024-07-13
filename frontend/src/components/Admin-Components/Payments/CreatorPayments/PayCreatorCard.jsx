import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PayCreatorCard({ project, onClose, onMakePayment }) {
    const [paymentDetails, setPaymentDetails] = useState({});
    const [transactionId, setTransactionId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    const fetchPaymentDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/payment/project/${project._id}`);
            setPaymentDetails(response.data);
        } catch (error) {
            console.error('Error fetching payment details:', error);
            setError('Failed to load payment details.');
        } finally {
            setLoading(false);
        }
    };

    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };

    const handleMakePayment = async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            await onMakePayment(project._id);
            setTransactionId('');
        } catch (error) {
            setError('Failed to make payment.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[450px]">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>
                <div className="text-center">
                    <p className="text-lg mb-4">Make Payment for Project <strong>{project.projectName}</strong></p>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="text-left mb-4">
                            <p className="mb-2"><strong>Account Holder Name:</strong> {paymentDetails.holderName}</p>
                            <p className="mb-2"><strong>Account Number:</strong> {paymentDetails.accountNumber}</p>
                            <p className="mb-2"><strong>IFSC Code:</strong> {paymentDetails.ifscCode}</p>
                            <p className="mb-2"><strong>Bank Name:</strong> {paymentDetails.bankName}</p>
                        </div>
                    )}
                    <input
                        type="text"
                        value={transactionId}
                        onChange={handleTransactionIdChange}
                        placeholder="Enter Transaction ID"
                        className="border border-gray-300 rounded w-full p-2 mb-4"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        onClick={handleMakePayment}
                        className="bg-green-500 text-white rounded w-full p-2 mb-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : 'Make Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
}
