import React from 'react';

const ReviewCard = ({ projectName, creatorName, projectLink, onApprove, onDecline, message }) => {
    return (
        <div className="p-6 w-[550px] mx-auto bg-card text-card-foreground rounded-lg">
            {message && (
                <div className="text-center text-green-500 mb-4">{message}</div>
            )}
            <div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Project name</div>
                    <div className="w-2/3 text-foreground">{projectName}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Creator Name</div>
                    <div className="w-2/3 text-foreground">{creatorName}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Project Files</div>
                    <div className="w-2/3 text-foreground">
                        <a href={projectLink} target="_blank" rel="noopener noreferrer">
                            {projectLink}
                        </a>
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <button
                        className="bg-[#ABCAF8] text-primary-foreground px-4 py-2 rounded-md"
                        type="submit"
                        onClick={onApprove}
                    >
                        Approve
                    </button>
                    <button
                        className="bg-[#ABCAF8] text-destructive-foreground px-4 py-2 rounded-md"
                        type="button"
                        onClick={onDecline}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
