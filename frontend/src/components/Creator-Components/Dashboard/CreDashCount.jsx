import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreDashCount() {
    const [ongoingAssignments, setOngoingAssignments] = useState(0);
    const [completedAssignments, setCompletedAssignments] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalQualityScore, setTotalQualityScore] = useState(0);

    useEffect(() => {
        const fetchProjectCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Authorization token not found');
                    return;
                }

                const response = await axios.get('/project/creator/project-counts', {
                    headers: {
                        Authorization: token, // Ensure Bearer prefix if required
                    },
                });

                // Update the state based on the response data
                const { completed, pending } = response.data;
                setCompletedAssignments(completed);
                setOngoingAssignments(pending);

                // Example calculations for earnings and quality score
                setTotalEarnings(completed * 10);  // Example: 10 pts per completed project
                setTotalQualityScore(completed * 5);  // Example: 5 pts per completed project

            } catch (error) {
                console.error('Error fetching project counts:', error);
            }
        };

        fetchProjectCounts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Ongoing Assignment</div>
                <div className="text-2xl font-bold">{ongoingAssignments}</div>
            </div>
            <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Completed Assignment</div>
                <div className="text-2xl font-bold">{completedAssignments}</div>
            </div>
            <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Total earnings</div>
                <div className="text-2xl font-bold">{totalEarnings} pts</div>
            </div>
            <div className="bg-[#E7CBA3] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Total Quality Score</div>
                <div className="text-2xl font-bold">{totalQualityScore} pts</div>
            </div>
        </div>
    );
}
