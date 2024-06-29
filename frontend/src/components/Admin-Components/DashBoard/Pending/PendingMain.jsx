import React, { useState } from 'react';
import AdDashNav from '../AdDashNav';
import PenInsideNav from './PenInsideNav';
import ApproveCard from './ApproveCard';

export default function PendingMain() {
    const [showApproveCard, setShowApproveCard] = useState(false);

    const handleReviewClick = () => {
        setShowApproveCard(true);
    };

    const handleCloseApproveCard = () => {
        setShowApproveCard(false);
    };

    const handleApprove = () => {
        console.log('Approved and Assigned');
        handleCloseApproveCard();
    };

    const handleDecline = () => {
        console.log('Declined');
        handleCloseApproveCard();
    };

    return (
        <div>
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <PenInsideNav />
                <div className="p-10 flex flex-col gap-6">
                    <div className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex justify-between items-center px-4">
                        <div className="flex gap-4 items-center">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="white" />
                            </svg>
                            <p className="text-sm">Client XYZ requested a project</p>
                        </div>
                        <button className="bg-[#ABCAF8] rounded-lg w-[100px] p-2 text-sm" onClick={handleReviewClick}>Review</button>
                    </div>
                    <div className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex justify-between items-center px-4">
                        <div className="flex gap-4 items-center">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="white" />
                            </svg>
                            <p className="text-sm">Client XYZ requested a project</p>
                        </div>
                        <button className="bg-[#ABCAF8] rounded-lg w-[100px] p-2 text-sm" onClick={handleReviewClick}>Review</button>
                    </div>
                </div>
            </div>

            {showApproveCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-md">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={handleCloseApproveCard}>
                            &times;
                        </button>
                        <ApproveCard
                            category="Demo Category"
                            projectName="Demo Project"
                            industry="Demo Industry"
                            preference="Demo Preference"
                            creatorCategory="Demo Creator Category"
                            onApprove={handleApprove}
                            onDecline={handleDecline}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
