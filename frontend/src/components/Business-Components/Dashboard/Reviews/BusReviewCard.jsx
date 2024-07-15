import React from 'react';

const BusReviewCard = ({ templateImage, projectName, company, creatorName, requirements, projectLink, projectCategory, onApprove, onDecline, message }) => {
    return (
        <div className="p-6 w-full max-w-[550px] mx-auto bg-card text-card-foreground rounded-lg">
            {message && (
                <div className="text-center text-green-500 mb-4">{message}</div>
            )}
            <div>
                {templateImage && (
                    <div className="mb-4 flex items-center justify-center">
                        <img src={templateImage} alt="Template" className="h-48 w-72 object-cover rounded-lg" />
                    </div>
                )}
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 text-muted-foreground">Project Name</div>
                    <div className="w-full sm:w-2/3 text-foreground">{projectName}</div>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 text-muted-foreground">Company</div>
                    <div className="w-full sm:w-2/3 text-foreground">{company}</div>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 text-muted-foreground">Creator Name</div>
                    <div className="w-full sm:w-2/3 text-foreground">{creatorName}</div>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 text-muted-foreground">Requirements</div>
                    <div className="w-full sm:w-2/3 text-foreground">{requirements}</div>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 text-muted-foreground">Project Category</div>
                    <div className="w-full sm:w-2/3 text-foreground">{projectCategory}</div>
                </div>
                <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="w-full sm:w-1/3 text-muted-foreground">Project Files</div>
                    <div className="w-full sm:w-2/3 text-foreground">
                        <a href={projectLink} target="_blank" rel="noopener noreferrer">
                            {projectLink}
                        </a>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
                    <button
                        className="bg-[#ABCAF8] text-primary-foreground px-4 py-2 rounded-md w-full sm:w-auto"
                        type="submit"
                        onClick={onApprove}
                    >
                        Approve
                    </button>
                    <button
                        className="bg-[#ABCAF8] text-destructive-foreground px-4 py-2 rounded-md w-full sm:w-auto"
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

export default BusReviewCard;
