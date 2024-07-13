import React, { useState } from 'react';
import axios from 'axios';

export default function PaymentCard({ project, onClose, onPaymentSuccess }) {
    const [transactionId, setTransactionId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };

    const handlePaymentSubmit = async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await axios.post(
                '/project/client/make-payment',
                { projectId: project.projectId, paymentId: transactionId },
                {
                    headers: {
                        Authorization: localStorage.getItem('BusToken'),
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
                    <p className="text-lg mb-4">Charge for {project.projectName}: Rs.{project.price} </p>
                    <img src="https://i.pinimg.com/736x/a8/69/40/a86940a4ed8a69539b341f3c414c47b3.jpg" alt="QR Code" className="mx-auto mb-4" />
                    <p className="mb-2">UPI ID: admin@upi</p>
                    <p className="mb-4">Make payment using the QR or UPI ID</p>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={handleTransactionIdChange}
                        placeholder="Enter Transaction ID"
                        className="border border-gray-300 rounded w-full p-2 mb-4"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        onClick={handlePaymentSubmit}
                        className="bg-blue-500 text-white rounded w-full p-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
}
