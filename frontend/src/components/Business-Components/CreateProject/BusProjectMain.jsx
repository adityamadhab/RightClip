import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../Dashboard/BusDashNav';
import SuccessPopup from './SucessPopup';
import CategoryTemplates from './CategoryTemplates';

const ProjectDetailsForm = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        industry: '',
        requirements: '',
        company: '',
        projectCategory: ''
    });
    const [industries, setIndustries] = useState([]);
    const [categories, setCategories] = useState([]);
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

        const fetchIndustries = async () => {
            try {
                const response = await axios.get('/industry/industry-types', {
                    headers: {
                        'Authorization': token
                    }
                });
                setIndustries(response.data);
            } catch (error) {
                console.error('Error fetching industries:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/category/project-categories', {
                    headers: {
                        'Authorization': token
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCompanyName();
        fetchIndustries();
        fetchCategories();
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
            requirements: '',
            company: formData.company,
            projectCategory: ''
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
                                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                                <select
                                    name="industry"
                                    id="industry"
                                    required
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select your industry</option>
                                    {industries.map(industry => (
                                        <option key={industry._id} value={industry.name}>{industry.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                                <input
                                    type="text"
                                    name="requirements"
                                    id="requirements"
                                    required
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Describe Your Requirements"
                                />
                            </div>
                            <div>
                                <label htmlFor="projectCategory" className="block text-sm font-medium text-gray-700">Project Category</label>
                                <select
                                    name="projectCategory"
                                    id="projectCategory"
                                    required
                                    value={formData.projectCategory}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>Select project category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
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
                <CategoryTemplates selectedCategory={formData.projectCategory} />
            </div>
            {showSuccessPopup && <SuccessPopup onClose={handleClosePopup} />}
        </div>
    );
};

export default ProjectDetailsForm;
