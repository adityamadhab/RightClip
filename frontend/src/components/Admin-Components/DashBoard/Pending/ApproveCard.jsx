import React from 'react';

const ApproveCard = ({ category, projectName, industry, preference, creatorCategory, onApprove, onDecline }) => {
    return (
        <div className="p-6 w-[450px] mx-auto bg-card text-card-foreground rounded-lg">
            <div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Category</div>
                    <div className="w-2/3 text-foreground">{category}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Project name</div>
                    <div className="w-2/3 text-foreground">{projectName}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Industry</div>
                    <div className="w-2/3 text-foreground">{industry}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Preference</div>
                    <div className="w-2/3 text-foreground">{preference}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Creator category</div>
                    <div className="w-2/3 text-foreground">{creatorCategory}</div>
                </div>
                <div className="flex justify-between mt-8">
                    <button
                        className="bg-[#ABCAF8] text-primary-foreground px-4 py-2 rounded-md "
                        type="submit"
                        onClick={onApprove}
                    >
                        Approve & Assign
                    </button>
                    <button
                        className="bg-[#ABCAF8] text-destructive-foreground px-4 py-2 rounded-md "
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
