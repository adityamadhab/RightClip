import React from 'react';

const BusReviewCard = ({ templateImage, projectName, company, creatorName, requirements, projectLink, projectCategory, message }) => {
    return (
        <div className="p-6 w-[550px] mx-auto bg-card text-card-foreground rounded-lg">
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
            </div>
        </div>
    );
}

export default BusReviewCard;
