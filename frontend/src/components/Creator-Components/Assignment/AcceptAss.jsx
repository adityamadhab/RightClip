import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreSidebar from "../CreSidebar";
import CreDashCount from "../Dashboard/CreDashCount";
import CreAssInsideNav from "./AssInsideNav";
import CreAssNav from "./CreAssNav";
import AcceptCard from './AcceptCard';

const ProjectItem = ({ name, clientName, onSubmit }) => (
    <div className="w-full md:w-[1100px] bg-white rounded-xl flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex gap-4 justify-center items-center">
            <svg width="25" height="22" viewBox="0 0 32 32" fill="gray" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
                <rect width="32" height="32" rx="16" fill="gray" />
            </svg>
            <div>
                <p className="text-sm">{name}</p>
                <p className="text-xs text-gray-500">{clientName}</p>
            </div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-4 md:mt-0">
            <button
                className="bg-[#ABCAF8] text-black text-sm h-[25px] w-[130px] rounded-md transition duration-300"
                onClick={onSubmit}
            >
                Review
            </button>
        </div>
    </div>
);

export default function AcceptAss() {
    const [showSubmissionCard, setShowSubmissionCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/accept-projects', {
                    headers: {
                        Authorization: localStorage.getItem('CreToken'),
                    },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleOpenSubmissionCard = (project) => {
        setSelectedProject(project);
        setShowSubmissionCard(true);
    };

    const handleCloseSubmissionCard = () => {
        setShowSubmissionCard(false);
        setSelectedProject(null);
        setMessage('');
    };

    const handleProjectSubmitSuccess = () => {
        setMessage('PROJECT ACCEPTED SUCCESSFULLY');
        const updatedProjects = projects.filter(p => p._id !== selectedProject._id);
        setProjects(updatedProjects);
        setTimeout(() => {
            setMessage('');
            handleCloseSubmissionCard();
        }, 2000);
    };

    return (
        <div className="flex">
            <CreSidebar />
            <div className="bg-white w-full p-4">
                <CreAssNav />
                <CreDashCount />
                <CreAssInsideNav />
                <div className="bg-[#FFEADD] flex flex-col rounded-xl">
                    <div className="p-10 flex flex-col gap-2">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <ProjectItem
                                    key={project._id}
                                    name={project.projectName}
                                    clientName={project.clientName}
                                    onSubmit={() => handleOpenSubmissionCard(project)}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-500">NO PROJECTS TO ACCEPT</div>
                        )}
                    </div>
                    {message && (
                        <div className="text-center text-green-500 mb-4">{message}</div>
                    )}
                </div>
            </div>
            {showSubmissionCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AcceptCard
                        project={selectedProject}
                        onClose={handleCloseSubmissionCard}
                        onSubmitSuccess={handleProjectSubmitSuccess}
                        message={message}
                    />
                </div>
            )}
        </div>
    );
}
