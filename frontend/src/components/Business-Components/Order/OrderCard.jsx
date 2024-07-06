import React from 'react';

const OrderCard = ({ projectName, projectLink, assigned, review, completed, clientName }) => {
    const getStatus = () => {
        if (completed) return 'Completed';
        if (review) return 'Under Review';
        if (assigned) return 'Assigned';
        return 'Pending Assignment';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'text-green-500';
            case 'Under Review':
                return 'text-orange-500';
            case 'Assigned':
                return 'text-yellow-500';
            case 'Pending Assignment':
                return 'text-red-500';
            default:
                return '';
        }
    };

    const status = getStatus();
    const statusColor = getStatusColor(status);

    return (
        <div className="p-6 w-[550px] mx-auto bg-card text-card-foreground rounded-lg">
            <div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Creator Assigned</div>
                    <div className="w-2/3 text-foreground">{clientName ? <div>{clientName}</div> : 'Not assigned to any creator yet'}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Project name</div>
                    <div className="w-2/3 text-foreground">{projectName}</div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Project Link</div>
                    <div className="w-2/3 text-foreground">
                        {status === 'Completed' && projectLink ? (
                            <a href={projectLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer">{projectLink}</a>
                        ) : (
                            'Project Link not available currently'
                        )}
                    </div>
                </div>
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-muted-foreground">Status</div>
                    <div className={`w-2/3 ${statusColor}`}>{status}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
