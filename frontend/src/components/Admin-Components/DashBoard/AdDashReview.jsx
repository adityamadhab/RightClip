import React from 'react';

const AdDashReview = () => {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 max-w-md shadow-md flex justify-between items-center">
            <div className="flex gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='mt-1'>
                    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#9A9A9A" />
                </svg>
                <p className="text-gray-800 text-sm">XYZ creator submitted ABC assignment</p>
            </div>
            <div className="ml-4">
                <button className="p-4 w-[100px] h-[30px] flex justify-center items-center  text-sm bg-[#ABCAF8] text-black rounded-2xl">Review</button>
            </div>
        </div>
    );
}

export default AdDashReview;
