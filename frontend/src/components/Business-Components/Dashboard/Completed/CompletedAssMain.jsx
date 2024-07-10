import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../BusDashNav';

export default function CompletedAssMain() {
    const [projects, setProjects] = useState([]);

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

    return (
        <div>
            <div className="bg-white w-full p-4">
                <BusDashNav/>
                <div className="flex justify-between p-4">
                    <h2>Completed Assignments</h2>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PROJECTS COMPLETED YET</p>
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
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
