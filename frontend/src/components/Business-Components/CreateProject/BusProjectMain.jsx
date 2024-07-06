import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../Dashboard/BusDashNav';
import SuccessPopup from './SucessPopup';

const ProjectDetailsForm = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        industry: '',
        preferences: '',
        company: '',
        creatorCategory: ''
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('BusToken');
        if (!token) {
            console.error('No token found');
            return;
        }

        const fetchCompanyName = async () => {
            try {
                const response = await axios.get('/business/user', {
                    headers: {
                        'Authorization': token
                    }
                });
                const { company } = response.data;
                setFormData((prevData) => ({
                    ...prevData,
                    company
                }));
            } catch (error) {
                console.error('Error fetching company name:', error);
            }
        };

        fetchCompanyName();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('BusToken');

        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axios.post('/project/create', formData, {
                headers: {
                    'Authorization': token
                }
            });
            console.log('Project created:', response.data);
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        setFormData({
            projectName: '',
            industry: '',
            preferences: '',
            company: formData.company, // Keep the company name
            creatorCategory: ''
        });
    };

    return (
        <div className='bg-white w-full p-4'>
            <BusDashNav />
            <div className="w-full flex justify-between">
                <div className="max-w-2xl w-full p-10 flex flex-col gap-4">
                    <div className="text-center mb-8">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-left">Project Details</h2>
                    </div>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-3">
                            <div>
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    required
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Give your project name"
                                />
                            </div>
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    id="industry"
                                    required
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your industry"
                                />
                            </div>
                            <div>
                                <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">Preferences</label>
                                <input
                                    type="text"
                                    name="preferences"
                                    id="preferences"
                                    required
                                    value={formData.preferences}
                                    onChange={handleChange}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Add your preferences"
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={formData.company}
                                    readOnly
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl bg-gray-100 cursor-not-allowed focus:outline-none sm:text-sm"
                                    placeholder="Company Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="creatorCategory" className="block text-sm font-medium text-gray-700">Creator Category</label>
                                <input
                                    type="text"
                                    name="creatorCategory"
                                    id="creatorCategory"
                                    required
                                    value={formData.creatorCategory}
                                    onChange={handleChange}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Choose Creator category"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-blue-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/3 bg-[#FFEADD] hidden lg:flex items-center justify-center p-4 rounded-xl">
                    <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
            {showSuccessPopup && <SuccessPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default ProjectDetailsForm;
