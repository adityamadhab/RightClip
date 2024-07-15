import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusDashNav from '../BusDashNav';

export default function PendingAssMain() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/client/pending-projects', {
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
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <BusDashNav />
                <div className="flex justify-between p-4">
                    <h2>Pending Assignments</h2>
                </div>
                <div className="p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PENDING ASSIGNMENTS</p>
                    ) : (
                        projects.map((project) => {
                            return (
                                <div key={project._id} className="h-auto sm:h-[60px] w-full sm:w-[1100px] bg-[#FFEADD] rounded-xl flex flex-col sm:flex-row items-start sm:items-center p-4 sm:px-4 mb-4 sm:mb-0">
                                    <div className="flex w-full items-start sm:items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
                                        <div className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0">
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="32" height="32" rx="16" fill="white" />
                                            </svg>
                                            <p className="text-sm">Project Name: {project.projectName}</p>
                                        </div>
                                        <div className="flex items-center w-full sm:w-auto">
                                            <div className="text-muted-foreground text-sm">Project not approved by admin yet</div>
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
