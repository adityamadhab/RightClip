import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreDashCount() {
    const [ongoingAssignments, setOngoingAssignments] = useState(0);
    const [completedAssignments, setCompletedAssignments] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalQualityScore, setTotalQualityScore] = useState(0);
    const [pointSettings, setPointSettings] = useState({
        earningsPerProject: 10,
        qualityScorePerProject: 5
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsResponse, settingsResponse] = await Promise.all([
                    axios.get('/project/creator/project-counts', {
                        headers: {
                            Authorization: localStorage.getItem('CreToken'),
                        },
                    }),
                    axios.get('/points/settings')
                ]);

                const { completed, pending } = projectsResponse.data;
                const settings = settingsResponse.data;

                setCompletedAssignments(completed);
                setOngoingAssignments(pending);
                setPointSettings(settings);

                // Calculate points using dynamic settings
                setTotalEarnings(completed * settings.earningsPerProject);
                setTotalQualityScore(completed * settings.qualityScorePerProject);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#8FD8CF] p-4 rounded-lg h-[174px] flex flex-col justify-between w-full">
                <div className="text-lg">Ongoing Assignment</div>
                <div className="text-2xl font-bold">{ongoingAssignments}</div>
            </div>
            <div className="bg-[#FFA4A5] p-4 rounded-lg h-[174px] flex flex-col justify-between w-full">
                <div className="text-lg">Completed Assignment</div>
                <div className="text-2xl font-bold">{completedAssignments}</div>
            </div>
            <div className="bg-[#FFC098] p-4 rounded-lg h-[174px] flex flex-col justify-between w-full">
                <div className="text-lg">Total earnings</div>
                <div className="text-2xl font-bold">{totalEarnings} pts</div>
            </div>
            <div className="bg-[#E7CBA3] p-4 rounded-lg h-[174px] flex flex-col justify-between w-full">
                <div className="text-lg">Total Quality Score</div>
                <div className="text-2xl font-bold">{totalQualityScore} pts</div>
            </div>
        </div>
    );
}
