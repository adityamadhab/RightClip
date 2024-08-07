import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdDashNav from '../AdDashNav';

export default function CompletedMain() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/completed');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <div className="flex justify-between p-4">
                    <h2>Completed Projects</h2>
                </div>
                <div className="p-4 md:p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PROJECTS ONGOING</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="h-auto w-full md:w-[1100px] bg-[#FFEADD] rounded-xl flex flex-col md:flex-row items-center px-4 py-2">
                                <div className="flex w-full items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="32" height="32" rx="16" fill="white" />
                                        </svg>
                                        <p className="text-sm font-semibold">Project Name: {project.projectName} by {project.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Done by: Creator {project.assignedCreator}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
