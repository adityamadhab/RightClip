import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../BusDashNav';
import BusReviewCard from './BusReviewCard';

export default function BusReviewMain() {
    const [showApproveCard, setShowApproveCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [message, setMessage] = useState('');
    const [decision, setDecision] = useState('');
    const [projectFeedback, setProjectFeedback] = useState('');
    const [qualityScore, setQualityScore] = useState(0);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/project/client/review-projects', {
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
        setShowApproveCard(true);
    };

    const handleCloseApproveCard = () => {
        setShowApproveCard(false);
        setSelectedProject(null);
    };

    const handleDecisionChange = (value) => {
        setDecision(value);
        if (value === 'approve') {
            setProjectFeedback('');
        }
    };

    const handleSubmit = async ({ decision, feedback, rating }) => {
        if (!decision) {
            setMessage('Please select a decision');
            return;
        }

        if (!rating) {
            setMessage('Please provide a rating');
            return;
        }

        if (decision === 'decline' && !feedback) {
            setMessage('Please provide feedback for declining');
            return;
        }

        try {
            if (decision === 'approve') {
                await handleApprove(selectedProject.projectId, feedback, rating);
            } else {
                await handleDecline(selectedProject.projectId, feedback, rating);
            }
        } catch (error) {
            console.error('Error processing decision:', error);
            setMessage('Error processing decision');
        }
    };

    const handleApprove = async (projectId, feedback, rating) => {
        try {
            await axios.put('/project/business/approve',
                { 
                    projectId,
                    feedback,
                    rating
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('BusToken')
                    }
                }
            );
            setMessage('PROJECT APPROVED');
            fetchProjects();
            setTimeout(() => {
                setMessage('');
                handleCloseApproveCard();
            }, 2000);
        } catch (error) {
            console.error('Error approving project:', error);
        }
    };

    const handleDecline = async (projectId, feedback, rating) => {
        try {
            await axios.put('/project/business/decline',
                { 
                    projectId,
                    feedback,
                    rating
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('BusToken')
                    }
                }
            );
            setMessage('PROJECT DECLINED');
            fetchProjects();
            setTimeout(() => {
                setMessage('');
                handleCloseApproveCard();
            }, 2000);
        } catch (error) {
            console.error('Error declining project:', error);
        }
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <BusDashNav />
                <div className="flex flex-col justify-between gap-2 p-4">
                    <h2>Review Assignments</h2>
                    <p className="text-[13px] text-gray-500">(P.S - PLEASE DO PAY YOUR PROJECT PAYMENT TO GET THE COMPLETE LIST.)</p>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PROJECTS FOR REVIEW</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-auto sm:h-[60px] w-full sm:w-[1100px] bg-[#FFEADD] rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:px-4 mb-4 sm:mb-0">
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto mb-2 sm:mb-0">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                    </svg>
                                    <p className="text-sm">{project.projectName}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                                    {project.status && (
                                        <span className={`text-sm ${project.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                                            {project.status}
                                        </span>
                                    )}
                                    <button
                                        className="bg-[#ABCAF8] rounded-lg w-full sm:w-[100px] p-2 text-sm"
                                        onClick={() => handleReviewClick(project)}
                                    >
                                        Review
                                    </button>
                                </div>
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
                        <BusReviewCard
                            templateImage={selectedProject.templateImage}
                            projectName={selectedProject.projectName}
                            company={selectedProject.company}
                            creatorName={selectedProject.assignedCreator}
                            requirements={selectedProject.requirements}
                            projectLink={selectedProject.projectLink}
                            projectCategory={selectedProject.projectCategory}
                            message={message}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
