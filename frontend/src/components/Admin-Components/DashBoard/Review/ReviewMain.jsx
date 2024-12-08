import { useState, useEffect } from 'react';
import axios from 'axios';
import AdDashNav from '../AdDashNav';
import ReviewCard from './ReviewCard';

export default function ReviewMain() {
    const [showApproveCard, setShowApproveCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [message, setMessage] = useState('');
    const [decision, setDecision] = useState('');
    const [projectFeedback, setProjectFeedback] = useState('');
    const [qualityScore, setQualityScore] = useState(0);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/project/review');
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

    const handleSubmit = async () => {
        if (!decision) {
            setMessage('Please select a decision');
            return;
        }

        if (!qualityScore) {
            setMessage('Please provide a quality score');
            return;
        }

        if (decision === 'decline' && !projectFeedback) {
            setMessage('Please provide feedback for declining');
            return;
        }

        try {
            if (decision === 'approve') {
                await handleApprove(selectedProject.projectId);
            } else {
                await handleDecline(selectedProject.projectId);
            }
        } catch (error) {
            console.error('Error processing decision:', error);
            setMessage('Error processing decision');
        }
    };

    const handleApprove = async (projectId) => {
        try {
            await axios.put('/project/admin/approve', {
                projectId,
                projectFeedback: '',
                rating: qualityScore
            });
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

    const handleDecline = async (projectId) => {
        try {
            await axios.put('/project/admin/decline', {
                projectId,
                projectFeedback,
                qualityScore
            });
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
                <AdDashNav />
                <div className="flex justify-between p-4">
                    <h2>Review Projects</h2>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PROJECTS FOR REVIEW</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-[60px] w-full lg:w-[1100px] bg-[#FFEADD] rounded-xl flex flex-col lg:flex-row justify-between items-center px-4">
                                <div className="flex gap-4 items-center w-full lg:w-auto">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                    </svg>
                                    <p className="text-sm">{project.projectName}</p>
                                </div>
                                <div className="flex items-center gap-4 w-full lg:w-auto mt-2 lg:mt-0">
                                    {project.status && (
                                        <span className={`text-sm ${project.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                                            {project.status}
                                        </span>
                                    )}
                                    <button
                                        className="bg-[#ABCAF8] rounded-lg w-full lg:w-[100px] p-2 text-sm"
                                        onClick={() => handleReviewClick(project)}
                                    >
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {showApproveCard && selectedProject && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-white p-6 rounded-lg shadow-md">
                            <button className="absolute top-2 right-2 text-gray-600" onClick={handleCloseApproveCard}>
                                &times;
                            </button>
                            <ReviewCard
                                templateImage={selectedProject.templateImage}
                                projectName={selectedProject.projectName}
                                company={selectedProject.company}
                                creatorName={selectedProject.assignedCreator}
                                requirements={selectedProject.requirements}
                                projectLink={selectedProject.projectLink}
                                projectCategory={selectedProject.projectCategory}
                                message={message}
                            />
                            <div className="mt-4">
                                <div className="flex gap-4 mb-4">
                                    <button
                                        className={`px-4 py-2 rounded ${decision === 'approve' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => handleDecisionChange('approve')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={`px-4 py-2 rounded ${decision === 'decline' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => handleDecisionChange('decline')}
                                    >
                                        Decline
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Quality Score (0-5)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={qualityScore}
                                        onChange={(e) => setQualityScore(Number(e.target.value))}
                                    />
                                </div>

                                {decision === 'decline' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                        <textarea
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows="3"
                                            value={projectFeedback}
                                            onChange={(e) => setProjectFeedback(e.target.value)}
                                            placeholder="Enter feedback for declining..."
                                        />
                                    </div>
                                )}

                                <button
                                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={handleSubmit}
                                >
                                    Submit Decision
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
