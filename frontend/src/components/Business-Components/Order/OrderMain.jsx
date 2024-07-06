import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderNav from './OrderNav';
import OrderCard from './OrderCard';
import { BusFooter } from '../BusFooter';

export default function OrderMain() {
    const [showOrderCard, setShowOrderCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/project/client/project-status', {
                headers: {
                    Authorization: localStorage.getItem('BusToken')
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleReviewClick = (project) => {
        setSelectedProject(project);
        setShowOrderCard(true);
    };

    const handleCloseOrderCard = () => {
        setShowOrderCard(false);
        setSelectedProject(null);
        fetchProjects();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow bg-white w-full p-4">
                <OrderNav />
                <div className="flex justify-between p-4">
                    <h2>My Orders/Projects</h2>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO ORDERS PRESENT</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex justify-between items-center px-4">
                                <div className="flex gap-4 items-center">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                    </svg>
                                    <p className="text-sm">{project.projectName}</p>
                                </div>
                                <button
                                    className="bg-[#ABCAF8] rounded-lg w-[100px] p-2 text-sm"
                                    onClick={() => handleReviewClick(project)}
                                >
                                    Review
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showOrderCard && selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-md">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={handleCloseOrderCard}>
                            &times;
                        </button>
                        <OrderCard
                            projectName={selectedProject.projectName}
                            projectLink={selectedProject.projectLink}
                            assigned={selectedProject.assigned}
                            review={selectedProject.review}
                            completed={selectedProject.completed}
                            clientName={selectedProject.assignedCreator}
                        />
                    </div>
                </div>
            )}
            <BusFooter />
        </div>
    );
}
