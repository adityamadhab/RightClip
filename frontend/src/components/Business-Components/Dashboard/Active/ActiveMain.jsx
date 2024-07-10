import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../BusDashNav';

export default function ActiveMain() {
    const [projects, setProjects] = useState([]);

    const getStatus = (project) => {
        if (project.completed) return 'Completed';
        if (project.review) return 'Under Review';
        if (project.assigned) return 'Assigned';
        return 'Pending Assignment';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'text-green-600';
            case 'Under Review':
                return 'text-orange-600';
            case 'Assigned':
                return 'text-yellow-600';
            case 'Pending Assignment':
                return 'text-red-500';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/client/active-projects', {
                    headers: {
                        Authorization: localStorage.getItem('BusToken'),
                    },
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
                <BusDashNav />
                <div className="flex justify-between p-4">
                    <h2>Active Assignments</h2>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO ACTIVE PROJECTS</p>
                    ) : (
                        projects.map((project) => {
                            const status = getStatus(project);
                            const statusColor = getStatusColor(status);

                            return (
                                <div key={project._id} className="h-[60px] w-[1100px] bg-[#FFEADD] rounded-xl flex items-center px-4">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="32" height="32" rx="16" fill="white" />
                                            </svg>
                                            <p className="text-sm">Project Name: {project.projectName}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="text-muted-foreground text-sm">Status: </div>
                                            <div className={`ml-2 ${statusColor} text-sm font-bold`}>{status}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
