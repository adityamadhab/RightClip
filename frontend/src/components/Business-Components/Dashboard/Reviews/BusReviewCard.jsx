import React, { useState } from 'react';

const BusReviewCard = ({ templateImage, projectName, company, creatorName, requirements, projectLink, projectCategory, message, onSubmit }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [decision, setDecision] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async () => {
        if (!decision) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                decision,
                feedback,
                rating
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Decision</label>
                        <div className="flex gap-4">
                            <button
                                className={`px-4 py-2 rounded ${decision === 'approve' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setDecision('approve')}
                            >
                                Approve
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${decision === 'decline' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setDecision('decline')}
                            >
                                Decline
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Feedback</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                            placeholder="Enter your feedback..."
                        />
                    </div>

                    <button
                        className="w-full bg-[#ABCAF8] text-primary-foreground px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !decision}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BusReviewCard;
