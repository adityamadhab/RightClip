import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPaymentsNav from '../AdminPaymentsNav';
import PayCreatorCard from './PayCreatorCard';

export default function AdCreatorPaymentsMain() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/project/admin/creator-payment');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to load projects.');
        } finally {
            setLoading(false);
        }
    };

    const handleReviewClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseReviewCard = () => {
        setSelectedProject(null);
    };

    const handleMakePayment = async (projectId) => {
        try {
            await axios.put(`/payment/project/${projectId}`);
            fetchProjects();
            setSelectedProject(null);
            setSuccessMessage('Payment successfully done.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error making payment:', error);
        }
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdminPaymentsNav />
                <div className="flex justify-between p-4">
                    <h2>Payment Details from Creators</h2>
                </div>
                {successMessage && (
                    <div className="p-4 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                <div className="p-10 flex flex-col gap-6">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : projects.length === 0 ? (
                        <p className="text-center text-gray-500">No payment details</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex items-center px-4">
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="32" height="32" rx="16" fill="white" />
                                        </svg>
                                        <p className="text-sm">Project Name: {project.projectName} by {project.company}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            className="bg-blue-500 text-white rounded-lg w-[100px] p-2 text-sm"
                                            onClick={() => handleReviewClick(project)}
                                        >
                                            Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {selectedProject && (
                <PayCreatorCard
                    project={selectedProject}
                    onClose={handleCloseReviewCard}
                    onMakePayment={handleMakePayment}
                />
            )}
        </div>
    );
}
