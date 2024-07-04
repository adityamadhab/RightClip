import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BusDashCount() {
    const [dashboardCounts, setDashboardCounts] = useState({
        totalProjects: 0,
        totalContentPieces: 0,
        pendingApprovals: 0,
        arrivingSoon: 0,
    });

    useEffect(() => {
        const fetchDashboardCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Authorization token not found');
                    return;
                }

                const response = await axios.get('/project/client/dashboard-counts', {
                    headers: {
                        Authorization: token,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Total Projects</div>
                <div className="text-2xl font-bold">{dashboardCounts.totalProjects}</div>
            </div>
            <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Total Content Pieces</div>
                <div className="text-2xl font-bold">{dashboardCounts.totalContentPieces}</div>
            </div>
            <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Pending Approvals</div>
                <div className="text-2xl font-bold">{dashboardCounts.pendingApprovals}</div>
            </div>
            <div className="bg-[#E7CBA3] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                <div className="text-lg">Arriving Soon</div>
                <div className="text-2xl font-bold">{dashboardCounts.arrivingSoon}</div>
            </div>
        </div>
    );
}
