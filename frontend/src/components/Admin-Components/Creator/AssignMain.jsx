import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdDashNav from '../DashBoard/AdDashNav';

export default function AssignMain() {
    const [creators, setCreators] = useState([]);
    const [projects, setProjects] = useState([]);
    const [showAssignPopup, setShowAssignPopup] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState(null);
    const [selectedProject, setSelectedProject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await axios.get('/creator/approved', {
                    headers: {
                        Authorization: localStorage.getItem('AdminToken'),
                    },
                });
                setCreators(response.data);
            } catch (error) {
                console.error('Error fetching approved creators:', error);
            }
        };
        fetchCreators();

        const fetchProjects = async () => {
            try {
                const response = await axios.get('/project/get');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleAssignClick = (creator) => {
        setSelectedCreator(creator);
        setShowAssignPopup(true);
    };

    const handleCloseAssignPopup = () => {
        setShowAssignPopup(false);
        setSelectedCreator(null);
        setSelectedProject('');
        setMessage('');
    };

    const handleAssignProject = async () => {
        try {
            await axios.put('/project/assign', {
                creatorId: selectedCreator._id,
                projectId: selectedProject,
            }, {
                headers: {
                    Authorization: localStorage.getItem('AdminToken'),
                },
            });
            setMessage('PROJECT ASSIGNED SUCCESSFULLY');
            setTimeout(() => {
                handleCloseAssignPopup();
            }, 2000);
        } catch (error) {
            console.error('Error assigning project:', error);
            setMessage('Error assigning project');
        }
    };

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <div className='bg-[#FFEADD] p-8'>
                    <h2 className='text-xl font-semibold mb-2'>Approved Requests</h2>
                    <p className='mb-8 text-sm'>Showing approved requests</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {creators.map((creator) => (
                            <div key={creator._id} className="bg-white p-4 rounded-lg shadow">
                                <img src={creator.image || '/insan.png'} alt={`${creator.firstName} ${creator.lastName} profile picture`} className="rounded-full mx-auto mb-4 w-24 h-24 object-cover" />
                                <h2 className="text-left text-md text-card-foreground mb-2">{`${creator.firstName} ${creator.lastName}`}</h2>
                                <p className="text-left text-sm text-muted-foreground mb-4">{creator.jobFunction}</p>
                                <button className="bg-[#ABCAF8] text-primary-foreground hover:bg-primary/80 w-full py-2 rounded-lg" onClick={() => handleAssignClick(creator)}>
                                    ASSIGN
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {showAssignPopup && (
                    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="relative bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <button className="absolute top-2 right-2 text-gray-600" onClick={handleCloseAssignPopup}>
                                &times;
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Assign Project to {selectedCreator.firstName} {selectedCreator.lastName}</h3>
                            <select
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                className="mb-4 p-2 border rounded-lg w-full"
                            >
                                <option value="">Select a project</option>
                                {projects.map((project) => (
                                    <option key={project._id} value={project._id}>{project.projectName} by {project.company}</option>
                                ))}
                            </select>
                            {message && <p className="text-center text-green-500 mb-4">{message}</p>}
                            <div className="flex justify-end space-x-2">
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleAssignProject}>
                                    Assign
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleCloseAssignPopup}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
