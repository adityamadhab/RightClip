import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectItem = ({ name, clientName }) => (
    <div className="w-full bg-white rounded-xl flex flex-col sm:flex-row justify-between p-4">
        <div className="flex gap-4 justify-center items-center mb-2 sm:mb-0 sm:ml-4">
            <svg width="25" height="22" viewBox="0 0 32 32" fill="gray" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
                <rect width="32" height="32" rx="16" fill="gray" />
            </svg>
            <div>
                <p className="text-sm">{name}</p>
                <p className="text-xs text-gray-500">{clientName}</p>
            </div>
        </div>
    </div>
);

export default function WorkingActivity() {
    const [projects, setProjects] = useState([]);
    const [timeframe, setTimeframe] = useState('this month');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/creator-projects', {
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

    return (
        <div className="bg-[#FFEADD] flex flex-col rounded-xl">
            <div className="flex justify-start ml-4 sm:ml-8">
                <select className="mt-4 w-[150px] sm:w-[250px] text-sm p-2 rounded-md" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                    <option value="this month">This month</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="last 7 days">Last 7 days</option>
                    <option value="last month">Last month</option>
                </select>
            </div>
            <div className="p-4 sm:p-10 flex flex-col gap-2">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectItem key={project._id} name={project.projectName} clientName={project.clientName} />
                    ))
                ) : (
                    <div className="text-center text-gray-500">NO PENDING PROJECTS</div>
                )}
            </div>
        </div>
    );
}
