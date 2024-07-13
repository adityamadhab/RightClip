import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentsNav from './PaymentsNav';
import PaymentCard from './PaymentCard';

export default function PaymentsMain() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/project/client/payment-projects', {
                headers: {
                    Authorization: localStorage.getItem('BusToken'),
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
        setSuccessMessage('Payment successfully done.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div>
            <div className="bg-white w-full p-4">
                <PaymentsNav />
                <div className="flex justify-between p-4">
                    <h2>Make payment of your project</h2>
                </div>
                {successMessage && (
                    <div className="p-4 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PROJECTS TO MAKE PAYMENT</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex items-center px-4">
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="32" height="32" rx="16" fill="white" />
                                        </svg>
                                        <p className="text-sm">Project Name: {project.projectName}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            className="bg-[#ABCAF8] rounded-lg w-[150px] h-[40px] p-2 text-sm"
                                            onClick={() => handlePaymentClick(project)}
                                        >
                                            Make Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {selectedProject && (
                <PaymentCard
                    project={selectedProject}
                    onClose={handleClosePaymentCard}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}
