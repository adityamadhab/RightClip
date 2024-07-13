import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../BusDashNav';

const ProjectPopup = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h2 className="text-lg font-bold mb-4">Project Details</h2>
                <p><strong>Project Name:</strong> {project.projectName}</p>
                <p><strong>Company:</strong> {project.company}</p>
                <p><strong>Creator Name:</strong> {project.assignedCreator}</p>
                <p><strong>Requirements:</strong> {project.requirements}</p>
                <p><strong>Project Category:</strong> {project.projectCategory}</p>
                <p><strong>Project Files:</strong> <a href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a></p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default function CompletedAssMain() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/client/completed-projects', {
                    headers: {
                        Authorization: localStorage.getItem('BusToken')
                    }
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleClosePopup = () => {
        setSelectedProject(null);
    };

    return (
        <div>
            <div className="bg-white w-full p-4">
                <BusDashNav />
                <div className="flex flex-col justify-between gap-2 p-4">
                    <h2>Completed Assignments</h2>
                    <p className="text-[13px] text-gray-500">(P.S - PLEASE DO PAY YOUR PROJECT PAYMENT TO GET THE COMPLETE LIST.)</p>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <div>
                            <p className="text-center text-gray-500">NO PROJECTS COMPLETED YET</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex items-center px-4">
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="32" height="32" rx="16" fill="white" />
                                        </svg>
                                        <p className="text-sm font-semibold">Project Name: {project.projectName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Done by: Creator {project.assignedCreator}</p>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                            onClick={() => handleProjectClick(project)}
                                        >
                                            Get Files
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {selectedProject && (
                <ProjectPopup project={selectedProject} onClose={handleClosePopup} />
            )}
        </div>
    );
}
