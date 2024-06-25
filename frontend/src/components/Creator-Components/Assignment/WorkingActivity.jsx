import React from 'react';

const projectData = [
    { id: 1, name: "Project - Lorem ipsum dolor sit amet." },
    { id: 2, name: "Project - Lorem ipsum dolor sit amet." },
    { id: 3, name: "Project - Lorem ipsum dolor sit amet." },
    { id: 4, name: "Project - Lorem ipsum dolor sit amet." },
];

const ProjectItem = ({ name }) => (
    <div className="h-[60px] w-[1100px] bg-white rounded-xl flex justify-between">
        <div className="flex gap-4 justify-center items-center ml-4">
            <svg width="25" height="22" viewBox="0 0 32 32" fill="gray" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
                <rect width="32" height="32" rx="16" fill="gray"/>
            </svg>
            <p className="text-sm">{name}</p>
        </div>
    </div>
);

export default function WorkingActivity() {
    return (
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
                {projectData.map(project => (
                    <ProjectItem key={project.id} name={project.name} />
                ))}
            </div>
        </div>
    );
}
