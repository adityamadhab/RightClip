import React from 'react';
import CreatorNavbar from './CreatorNav';

export default function Submission() {
    return (
        <div className='h-screen overflow-hidden'>
            <CreatorNavbar/>
            <div className="h-screen flex flex-col items-center justify-center bg-white">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="bg-white p-6 rounded-lg">
                        <div className="mb-4">
                            <div className="flex justify-center">
                                <img src="/Creator-assests/submission.png" alt="RightCliq Creator Logo" className=" mb-8" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900">Thanks for submitting</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Your form is under review. Please wait for 00 hours for confirmation.
                        </p>
                        <div className="mt-8">
                            <button className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black hover:bg-gray-100">
                                GO TO PROFILE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
