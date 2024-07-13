import React from 'react';

export default function ReviewPaymentCard({ project, onClose, onRejectPayment }) {
    const handleRejectPayment = () => {
        onRejectPayment(project._id);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[400px]">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>
                <div className="text-center">
                    <p className="text-lg mb-4">Review Payment for Project {project.projectName}</p>
                    <p><strong>Company:</strong> {project.company}</p>
                    <p><strong>Payment ID:</strong> {project.paymentId}</p>
                    <button
                        onClick={handleRejectPayment}
                        className="bg-red-500 text-white rounded w-full p-2 mt-4"
                    >
                        Reject Payment
                    </button>
                </div>
            </div>
        </div>
    );
}
