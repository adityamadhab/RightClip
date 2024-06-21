import React from 'react';
import CreatorNavbar from './CreatorNav';

export default function SetUpStep2({ nextStep, prevStep }) {
    return (
        <div className='h-screen overflow-hidden'>
            <CreatorNavbar/>
            <div className="h-screen flex">
                <div className="w-2/3 flex items-center justify-center bg-white">
                    <div className="max-w-md w-full space-y-8 p-10">
                        
                        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="linkedin" className="block mb-1 text-sm font-medium text-black">Share your LinkedIn/Behance link</label>
                                    <input id="linkedin" name="linkedin" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="LinkedIn/Behance link" />
                                </div>
                                <div>
                                    <label htmlFor="resume" className="block mb-1 text-sm font-medium text-black">Upload Your Resume (PDF)</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-[#E4F5FF] hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01.88-2.598L9 13l-1.12-.402A4 4 0 117 16zm6 0v-6a4 4 0 117 0v6m-3 4h3m-12 0h3M7 20v-6a4 4 0 011.88-3.402L10 10l1.12-.402A4 4 0 0112 10v10m-4 0h4m6 0h4M4 20h4"></path></svg>
                                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500">PDF only</p>
                                            </div>
                                            <input id="resume" name="resume" type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="job-function" className="block mb-1 text-sm font-medium text-black">What is your current job function</label>
                                    <select id="job-function" name="job-function" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="">Select job function</option>
                                        <option value="developer">Developer</option>
                                        <option value="designer">Designer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="contact-number" className="block mb-1 text-sm font-medium text-black">Contact number</label>
                                    <input id="contact-number" name="contact-number" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Contact number" />
                                </div>
                            </div>
                            <div className="flex justify-between">
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
