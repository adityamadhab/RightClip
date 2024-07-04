import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreSidebar from "../CreSidebar";
import CreDashCount from "../Dashboard/CreDashCount";
import CreAssInsideNav from "./AssInsideNav";
import CreAssNav from "./CreAssNav";
import TimelineNav from "./TimeLineNav";
import SubmitCard from './SubmitCard';

const ProjectItem = ({ name, clientName, onSubmit }) => (
    <div className="h-[60px] w-[1100px] bg-white rounded-xl flex justify-between">
        <div className="flex gap-4 justify-center items-center ml-4">
            <svg width="25" height="22" viewBox="0 0 32 32" fill="gray" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
                <rect width="32" height="32" rx="16" fill="gray" />
            </svg>
            <div>
                <p className="text-sm">{name}</p>
                <p className="text-xs text-gray-500">{clientName}</p>
            </div>
        </div>
        <div className="flex gap-4 justify-center items-center mr-4">
            <button
                className="bg-[#ABCAF8] text-black text-sm h-[25px] w-[130px] rounded-md transition duration-300"
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    </div>
);

export default function CreAssTimelines() {
    const [showSubmissionCard, setShowSubmissionCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/creator-projects', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
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
    };

    return (
        <div className="flex">
            <CreSidebar />
            <div className="bg-white w-full p-4">
                <CreAssNav />
                <CreDashCount />
                <CreAssInsideNav />
                <TimelineNav />
                <div className="bg-[#FFEADD] flex flex-col rounded-xl">
                    <div className="flex justify-start ml-8">
                        <select className="mt-4 w-[300px] text-sm p-2 rounded-md">
                            <option value="all">This month</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7days">Last 7 days</option>
                            <option value="lastmonth">Last month</option>
                        </select>
                    </div>
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
                            <div className="text-center text-gray-500">NO PROJECTS FOR SUBMISSION</div>
                        )}
                    </div>
                </div>
            </div>
            {showSubmissionCard && <SubmitCard project={selectedProject} onClose={handleCloseSubmissionCard} />}
        </div>
    );
}
