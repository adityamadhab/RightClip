import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatorPaymentsNav from './CreatorPaymentsNav';
import CreReviewPaymentCard from './ReviewPaymentsCard';

export default function CreatorPaymentsMain() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/project/creator/payment-projects', {
                headers: {
                    Authorization: localStorage.getItem('CreToken'),
                },
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handlePaymentClick = (project) => {
        setSelectedProject(project);
    };

    const handleClosePaymentCard = () => {
        setSelectedProject(null);
    };

    const handlePaymentSuccess = () => {
        fetchProjects();
        setSuccessMessage('Details successfully submitted.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <CreatorPaymentsNav />
                <div className="flex justify-between p-4">
                    <h2>Submit Details to receive your payments</h2>
                </div>
                {successMessage && (
                    <div className="p-4 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                <div className="p-4 md:p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PROJECTS TO GIVE DETAILS</p>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project._id}
                                className="h-auto w-full md:w-[1100px] bg-[#FFEADD] rounded-xl flex flex-col md:flex-row items-start md:items-center px-4 py-4 md:py-0"
                            >
                                <div className="lg:p-2 flex w-full flex-col md:flex-row items-start md:items-center justify-between">
                                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect width="32" height="32" rx="16" fill="white" />
                                        </svg>
                                        <p className="text-sm">Project Name: {project.projectName}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            className="bg-[#ABCAF8] rounded-lg w-full md:w-[200px] h-[40px] p-2 text-sm"
                                            onClick={() => handlePaymentClick(project)}
                                        >
                                            Submit Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {selectedProject && (
                <CreReviewPaymentCard
                    project={selectedProject}
                    onClose={handleClosePaymentCard}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}
