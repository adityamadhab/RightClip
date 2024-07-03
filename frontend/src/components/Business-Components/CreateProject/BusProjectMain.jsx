import React from 'react';
import BusDashNav from '../Dashboard/BusDashNav';

const ProjectDetailsForm = () => {
    return (
        <div className=' bg-white w-full p-4'>
            <BusDashNav />
            <div className="w-full flex justify-between mt-8">
                <div className="max-w-2xl w-full p-10 flex flex-col gap-4">
                    <div className="text-center mb-8">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-left">Project Details</h2>
                    </div>
                    <form className="space-y-8">
                        <div className="rounded-md shadow-sm space-y-8">
                            <div>
                                <input
                                    type="text"
                                    name="projectName"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Give your project name"
                                />
                            </div>
                            <div>
                                <select
                                    name="industry"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Choose your industry</option>
                                    <option value="Industry 1">Industry 1</option>
                                    <option value="Industry 2">Industry 2</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    name="preferences"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Add your preferences</option>
                                    <option value="Preference 1">Preference 1</option>
                                    <option value="Preference 2">Preference 2</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Choose/Type your company"
                                />
                            </div>
                            <div>
                                <select
                                    name="creatorCategory"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Choose Creator category</option>
                                    <option value="Category 1">Category 1</option>
                                    <option value="Category 2">Category 2</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/3 bg-[#FFEADD] hidden lg:flex items-center justify-center p-4 rounded-xl">
                    <div class="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="rounded-xl h-[140px] w-[160px] bg-white overflow-hidden flex-row">
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[100px] w-[360px] object-cover border-t-2 rounded-xl" />
                            <h2 className="text-sm p-2 h-[40px] text-center">Demo Category</h2>
                        </div>
                        <div className="rounded-xl h-[140px] w-[160px] bg-white overflow-hidden flex-row">
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[100px] w-[360px] object-cover border-t-2 rounded-xl" />
                            <h2 className="text-sm p-2 h-[40px] text-center">Demo Category</h2>
                        </div>
                        <div className="rounded-xl h-[140px] w-[160px] bg-white overflow-hidden flex-row">
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[100px] w-[360px] object-cover border-t-2 rounded-xl" />
                            <h2 className="text-sm p-2 h-[40px] text-center">Demo Category</h2>
                        </div>
                        <div className="rounded-xl h-[140px] w-[160px] bg-white overflow-hidden flex-row">
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[100px] w-[360px] object-cover border-t-2 rounded-xl" />
                            <h2 className="text-sm p-2 h-[40px] text-center">Demo Category</h2>
                        </div>
                        <div className="rounded-xl h-[140px] w-[160px] bg-white overflow-hidden flex-row">
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[100px] w-[360px] object-cover border-t-2 rounded-xl" />
                            <h2 className="text-sm p-2 h-[40px] text-center">Demo Category</h2>
                        </div>
                        <div className="rounded-xl h-[140px] w-[160px] bg-white overflow-hidden flex-row">
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[100px] w-[360px] object-cover border-t-2 rounded-xl" />
                            <h2 className="text-sm p-2 h-[40px] text-center">Demo Category</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsForm;
