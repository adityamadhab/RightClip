import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BusDashCount() {
    const [dashboardCounts, setDashboardCounts] = useState({
        totalProjects: 0,
        completedProjects: 0,
        pendingApprovals: 0,
        cancalled: 0,
    });

    useEffect(() => {
        const fetchDashboardCounts = async () => {
            try {
                const token = localStorage.getItem('BusToken');
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
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                    <div className="text-lg">Total Projects</div>
                    <div className="text-2xl font-bold">{dashboardCounts.totalProjects}</div>
                </div>
                <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                    <div className="text-lg">Completed Projects</div>
                    <div className="text-2xl font-bold">{dashboardCounts.completedProjects}</div>
                </div>
                <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                    <div className="text-lg">Pending Approvals</div>
                    <div className="text-2xl font-bold">{dashboardCounts.pendingApprovals}</div>
                </div>
                <div className="bg-[#E7CBA3] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                    <div className="text-lg">Cancalled Projects</div>
                    <div className="text-2xl font-bold">{dashboardCounts.cancalled}</div>
                </div>
            </div>
            <h2 className="text-md font-bold mb-8 bg-[#ABCAF8] p-2 rounded-xl w-full text-center">Important Links</h2>
            <div class="p-4">
                <div class="flex justify-between items-center mb-4">
                    <Link to={'/business/dashboard/active'} class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[250px]">
                        <p>Active Assignments</p>
                    </Link>
                    <Link to={'/business/dashboard/pending'} class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[250px]">
                        <p>Pending Assignments</p>
                    </Link>
                    <Link class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[265px]">
                        <p>Review Assignments</p>
                    </Link>
                    <Link class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[250px]">
                        <p>Completed Assignments</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
