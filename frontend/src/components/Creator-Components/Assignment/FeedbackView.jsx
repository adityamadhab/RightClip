import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimelineNav from './TimeLineNav';

export default function FeedbackView() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/project/creator/project-feedbacks', {
                headers: {
                    Authorization: localStorage.getItem('CreToken')
                }
            });
            setFeedbacks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            setError('Failed to load feedbacks');
            setLoading(false);
        }
    };

    const renderRating = (rating) => {
        return "⭐".repeat(rating);
    };

    return (
        <>
            <TimelineNav />
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Project Feedbacks</h2>
                
                {loading ? (
                    <p className="text-center text-gray-500">Loading feedbacks...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : feedbacks.length === 0 ? (
                    <p className="text-center text-gray-500">No feedbacks available</p>
                ) : (
                    <div className="space-y-6">
                        {feedbacks.map((feedback) => (
                            <div key={feedback.projectId} className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-medium mb-4">{feedback.projectName}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {feedback.adminFeedback && (
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="font-medium mb-2">Admin Feedback</h4>
                                            <p className="text-sm mb-2">{feedback.adminFeedback.feedback || 'No written feedback'}</p>
                                            <div className="text-sm text-yellow-500">
                                                {renderRating(feedback.adminFeedback.rating)}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {feedback.businessFeedback && (
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <h4 className="font-medium mb-2">Business Feedback</h4>
                                            <p className="text-sm mb-2">{feedback.businessFeedback.feedback || 'No written feedback'}</p>
                                            <div className="text-sm text-yellow-500">
                                                {renderRating(feedback.businessFeedback.rating)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    Status: {feedback.completed ? 'Completed' : 'In Progress'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
} 