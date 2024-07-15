import React from 'react';

const ApproveCard = ({ category, projectName, industry, preference, creatorCategory, onApprove, onDecline }) => {
    return (
        <div className="p-4 md:p-6 w-full max-w-md lg:max-w-lg mx-auto bg-card text-card-foreground rounded-lg">
            <div>
                <div className="mb-4 flex flex-col">
                    <div className="w-full md:w-1/3 text-muted-foreground mb-2">Company/Business</div>
                    <div className="w-full md:w-2/3 text-foreground">{category}</div>
                </div>
                <div className="mb-4 flex flex-col">
                    <div className="w-full md:w-1/3 text-muted-foreground mb-2">Project name</div>
                    <div className="w-full md:w-2/3 text-foreground">{projectName}</div>
                </div>
                <div className="mb-4 flex flex-col">
                    <div className="w-full md:w-1/3 text-muted-foreground mb-2">Industry</div>
                    <div className="w-full md:w-2/3 text-foreground">{industry}</div>
                </div>
                <div className="mb-4 flex flex-col">
                    <div className="w-full md:w-1/3 text-muted-foreground mb-2">Requirements</div>
                    <div className="w-full md:w-2/3 text-foreground">{preference}</div>
                </div>
                <div className="mb-4 flex flex-col">
                    <div className="w-full md:w-1/3 text-muted-foreground mb-2">Project category</div>
                    <div className="w-full md:w-2/3 text-foreground">{creatorCategory}</div>
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-8">
                    <button
                        className="bg-[#ABCAF8] text-primary-foreground px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                        type="submit"
                        onClick={onApprove}
                    >
                        Approve & Assign
                    </button>
                    <button
                        className="bg-[#ABCAF8] text-destructive-foreground px-4 py-2 rounded-md w-full md:w-auto"
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

export default ApproveCard;
