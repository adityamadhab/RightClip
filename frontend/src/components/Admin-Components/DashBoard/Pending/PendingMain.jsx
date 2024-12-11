import { useState, useEffect } from 'react';
import axios from 'axios';
import AdDashNav from '../AdDashNav';
import PenInsideNav from './PenInsideNav';
import ApproveCard from './ApproveCard';
import { useNavigate } from 'react-router-dom';

export default function PendingMain() {
    const navigate = useNavigate();
    const [showApproveCard, setShowApproveCard] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState({});

    // Fetch projects on component mount
    useEffect(() => {
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

    // Project card handlers
    const handleReviewClick = (project) => {
        setSelectedProject(project);
        setShowApproveCard(true);
    };

    const handleCloseApproveCard = () => {
        setShowApproveCard(false);
        setSelectedProject(null);
        setIsEditing(false);
    };

    const handleApprove = () => {
        navigate('/admin/creator/assign');
    };

    const handleDecline = async () => {
        try {
            await axios.put('/project/admin/cancel', { 
                projectId: selectedProject._id 
            });
            setProjects(prevProjects => 
                prevProjects.filter(project => project._id !== selectedProject._id)
            );
            handleCloseApproveCard();
        } catch (error) {
            console.error('Error declining project:', error);
        }
    };

    // Edit mode handlers
    const handleEditClick = () => {
        setIsEditing(true);
        setEditedProject(selectedProject);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProject(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put('/project/edit', {
                projectId: editedProject._id,
                projectName: editedProject.projectName,
                industry: editedProject.industry,
                requirements: editedProject.requirements,
                projectCategory: editedProject.projectCategory,
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('AdminToken')}`
                }
            });
            
            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project._id === editedProject._id ? editedProject : project
                )
            );
            setSelectedProject(editedProject);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    // Render edit form
    const renderEditForm = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Project Details</h2>
            <div className="space-y-3">
                {['projectName', 'industry', 'projectCategory'].map(field => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={editedProject[field] || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter ${field.toLowerCase().replace(/([A-Z])/g, ' $1')}`}
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Requirements
                    </label>
                    <textarea
                        name="requirements"
                        value={editedProject.requirements || ''}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter project requirements"
                    />
                </div>
            </div>
            <div className="flex gap-3 mt-6">
                <button
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    onClick={handleSaveEdit}
                >
                    Save Changes
                </button>
                <button
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => {
                        setIsEditing(false);
                        setEditedProject(selectedProject);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <PenInsideNav />
                <div className="p-4 md:p-10 flex flex-col gap-6">
                    {projects.length === 0 ? (
                        <p className="text-center text-gray-500">NO PENDING PROJECTS</p>
                    ) : (
                        projects.map(project => (
                            <div key={project._id} 
                                className="h-auto w-full md:w-[1100px] bg-[#FFEADD] rounded-xl flex flex-col md:flex-row justify-between items-center px-4 py-2"
                            >
                                <div className="flex gap-4 items-center">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="32" rx="16" fill="white" />
                                    </svg>
                                    <p className="text-sm">
                                        {project.clientName} requested a project: {project.projectName}
                                    </p>
                                </div>
                                <button
                                    className="bg-[#ABCAF8] rounded-lg w-full md:w-[100px] p-2 text-sm mt-2 md:mt-0"
                                    onClick={() => handleReviewClick(project)}
                                >
                                    Review
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showApproveCard && selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4">
                        <button 
                            className="absolute top-2 right-2 text-gray-600" 
                            onClick={handleCloseApproveCard}
                        >
                            &times;
                        </button>
                        {isEditing ? (
                            renderEditForm()
                        ) : (
                            <>
                                <ApproveCard
                                    category={selectedProject.company}
                                    projectName={selectedProject.projectName}
                                    industry={selectedProject.industry}
                                    preference={selectedProject.requirements}
                                    creatorCategory={selectedProject.projectCategory}
                                    onApprove={handleApprove}
                                    onDecline={handleDecline}
                                />
                                <button
                                    className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                    onClick={handleEditClick}
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5" 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit Project Details
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
