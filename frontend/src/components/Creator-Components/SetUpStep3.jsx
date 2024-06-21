import React from 'react';
import CreatorNavbar from './CreatorNav';

export default function SetUpStep3({ nextStep, prevStep }) {
    return (
        <div className='h-screen overflow-hidden'>
            <CreatorNavbar />
            <div className="h-screen flex">
                <div className="w-2/3 flex justify-center bg-white mt-20">
                    <div className="max-w-md w-full space-y-8 p-10">
                        <div className="text-left">
                            <h2 className="mb-12 text-xl font-semibold text-gray-900 whitespace-nowrap overflow-hidden">
                                Lets understand your background:
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="linkedin" className="block mb-1 text-sm font-medium text-black">What is your total professional work experience?</label>
                                    <input id="linkedin" name="linkedin" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="In years" />
                                </div>
                                <div>
                                    <label htmlFor="linkedin" className="block mb-1 text-sm font-medium text-black">How long have you been working profile?</label>
                                    <input id="linkedin" name="linkedin" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="In years" />
                                </div>
                                <div>
                                    <label htmlFor="job-function" className="block mb-1 text-sm font-medium text-black">Which of the sector are you proficient in?</label>
                                    <select id="job-function" name="job-function" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="">Select job function</option>
                                        <option value="developer">Developer</option>
                                        <option value="designer">Designer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-12 flex justify-between">
                                <button type="button" onClick={prevStep} className="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    BACK
                                </button>
                                <button type="submit" className="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    NEXT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/3 hidden h-screen lg:flex items-center justify-center bg-gradient-to-br from-[#0A0266] via-[#080068] to-[#004D95]">
                </div>
            </div>
        </div>
    );
}
