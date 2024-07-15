import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminPaymentsNav from '../AdminPaymentsNav';
import ReviewPaymentCard from './ReviewPaymentCrad';

export default function AdBusinessPaymentsMain() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/project/admin/business-payment');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleReviewClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseReviewCard = () => {
        setSelectedProject(null);
    };

    const handleRejectPayment = async (projectId) => {
        try {
            await axios.post(`/project/admin/reject-payment/${projectId}`);
            fetchProjects();
            setSelectedProject(null);
            setSuccessMessage('Payment successfully rejected.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error rejecting payment:', error);
        }
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdminPaymentsNav />
                <div className="flex justify-between p-4">
                    <h2>Paid Projects from Business</h2>
                </div>
                {successMessage && (
                    <div className="p-4 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                <div className="p-4 md:p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PAID PROJECTS</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="bg-[#FFEADD] rounded-xl p-4 md:p-6 flex flex-col gap-2 md:flex-row items-center">
                                <div className="flex items-center mb-2 md:mb-0">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                    </svg>
                                    <p className="text-sm">Project Name: {project.projectName} by {project.company}</p>
                                </div>
                                <div className="flex items-center md:ml-auto mt-2 md:mt-0">
                                    <button
                                        className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm"
                                        onClick={() => handleReviewClick(project)}
                                    >
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {selectedProject && (
                    <ReviewPaymentCard
                        project={selectedProject}
                        onClose={handleCloseReviewCard}
                        onRejectPayment={handleRejectPayment}
                    />
                )}
            </div>
        </div>
    );
}
