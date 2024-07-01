import React from 'react';
import CreatorNavbar from './CreatorNav';

export default function SetUpStep3({ nextStep, prevStep, formData, setFormData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='h-screen overflow-hidden'>
            <CreatorNavbar />
            <div className="h-screen flex">
                <div className="w-2/3 flex items-center justify-center bg-white">
                    <div className="max-w-md w-full space-y-8 p-10">
                        <div className="text-center">
                            <h2 className="mb-12 text-2xl font-semibold text-gray-900">Add your bio</h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="bio" className="block mb-1 text-sm font-medium text-black">Add your bio</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Add your bio"
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="workSample" className="block mb-1 text-sm font-medium text-black">Share Your Work Samples (Google Drive link)</label>
                                    <input
                                        id="workSample"
                                        name="workSample"
                                        type="text"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Google Drive link"
                                        value={formData.workSample || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="button"
                                    className="w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-blue-900 bg-white border-blue-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={prevStep}
                                >
                                    BACK
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/3 hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0A0266] via-[#080068] to-[#004D95]">
                </div>
            </div>
        </div>
    );
}
