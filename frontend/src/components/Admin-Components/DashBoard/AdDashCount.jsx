import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdDashCount() {
    const [dashboardCounts, setDashboardCounts] = useState({
        ongoingProjects: 0,
        completedPieces: 0,
        pendingApprovals: 0,
    });

    useEffect(() => {
        const fetchDashboardCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Authorization token not found');
                    return;
                }

                const response = await axios.get('/project/admin/project-counts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDashboardCounts(response.data);
            } catch (error) {
                console.error('Error fetching dashboard counts:', error);
            }
        };

        fetchDashboardCounts();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Ongoing Projects</div>
                <div className="text-2xl font-bold">{dashboardCounts.ongoingProjects}</div>
            </div>
            <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Completed Pieces</div>
                <div className="text-2xl font-bold">{dashboardCounts.completedPieces}</div>
            </div>
            <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Pending Approvals (Creators & Clients)</div>
                <div className="text-2xl font-bold">{dashboardCounts.pendingApprovals}</div>
            </div>
        </div>
    );
}
