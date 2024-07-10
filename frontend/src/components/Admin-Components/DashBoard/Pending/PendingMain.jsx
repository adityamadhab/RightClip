import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdDashNav from '../AdDashNav';
import PenInsideNav from './PenInsideNav';
import ApproveCard from './ApproveCard';
import { useNavigate } from 'react-router-dom';

export default function PendingMain() {
    const navigate = useNavigate();
    const [showApproveCard, setShowApproveCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/get');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleReviewClick = (project) => {
        setSelectedProject(project);
        setShowApproveCard(true);
    };

    const handleCloseApproveCard = () => {
        setShowApproveCard(false);
        setSelectedProject(null);
    };

    const handleApprove = () => {
        navigate('/admin/creator/assign');
    };

    const handleDecline = async () => {
        try {
            await axios.put('/project/admin/cancel', { projectId: selectedProject._id });
            setProjects((prevProjects) => prevProjects.filter(project => project._id !== selectedProject._id));
            handleCloseApproveCard();
        } catch (error) {
            console.error('Error declining project:', error);
        }
    };

    return (
        <div>
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <PenInsideNav />
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PENDING PROJECTS</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex justify-between items-center px-4">
                                <div className="flex gap-4 items-center">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                    </svg>
                                    <p className="text-sm">{project.clientName} requested a project: {project.projectName}</p>
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

            {showApproveCard && selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-md">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={handleCloseApproveCard}>
                            &times;
                        </button>
                        <ApproveCard
                            category={selectedProject.company}
                            projectName={selectedProject.projectName}
                            industry={selectedProject.industry}
                            preference={selectedProject.requirements}
                            creatorCategory={selectedProject.projectCategory}
                            onApprove={handleApprove}
                            onDecline={handleDecline}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
