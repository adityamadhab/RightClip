import React from 'react';
import axios from 'axios';

const AcceptCard = ({ project, onClose, onSubmitSuccess, message }) => {
    const handleApprove = async () => {
        try {
            const response = await axios.put('/project/creator/aceept',
                { projectId: project._id },
                {
                    headers: {
                        Authorization: localStorage.getItem('CreToken'),
                    },
                }
            );
            if (response.status === 200) {
                onSubmitSuccess(response.data.message);
            }
        } catch (error) {
            console.error('Error accepting project:', error);
        }
    };

    const handleDecline = async () => {
        try {
            const response = await axios.put('/project/creator/decline',
                { projectId: project._id },
                {
                    headers: {
                        Authorization: localStorage.getItem('CreToken'),
                    },
                }
            );
            if (response.status === 200) {
                onClose(response.data.message);
            }
        } catch (error) {
            console.error('Error declining project:', error);
        }
    };

    return (
        <div className="p-6 w-[550px] mx-auto bg-white text-black rounded-lg relative">
            {message && (
                <div className="text-center text-green-500 mb-4">{message}</div>
            )}
            <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={onClose}
            >
                &#x2715;
            </button>
            <div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-gray-500">Project name</div>
                    <div className="w-2/3 text-black">{project?.projectName}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-gray-500">Company Name</div>
                    <div className="w-2/3 text-black">{project?.company}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-gray-500">Industry</div>
                    <div className="w-2/3 text-black">{project?.industry}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-gray-500">Project Category</div>
                    <div className="w-2/3 text-black">{project?.projectCategory}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-gray-500">Requirements</div>
                    <div className="w-2/3 text-black">{project?.requirements}</div>
                </div>
                <div className="flex justify-between mt-8">
                    <button
                        className="bg-[#ABCAF8] text-black px-4 py-2 rounded-md"
                        type="submit"
                        onClick={handleApprove}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-[#ABCAF8] text-black px-4 py-2 rounded-md"
                        type="button"
                        onClick={handleDecline}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcceptCard;
