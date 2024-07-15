import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdDashNav from '../DashBoard/AdDashNav';
import { Link } from 'react-router-dom';

export default function PenReqMain() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchNonApprovedCreators = async () => {
            try {
                const response = await axios.get('/creator/non-approved');
                setCreators(response.data);
            } catch (error) {
                console.error('Error fetching non-approved creators:', error);
            }
        };
        fetchNonApprovedCreators();
    }, []);

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <div className="bg-[#FFEADD] p-4 sm:p-6 md:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Pending Request</h2>
                    <p className="mb-8 text-sm">Showing Pending requests</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {creators.map((creator) => (
                            <div key={creator._id} className="bg-white p-4 rounded-lg shadow">
                                <img src={creator.image || '/insan.png'} alt={`${creator.firstName} ${creator.lastName} profile picture`} className="rounded-full mx-auto mb-4 w-24 h-24 object-cover" />
                                <h2 className="text-left text-md text-card-foreground mb-2">{creator.firstName} {creator.lastName}</h2>
                                <p className="text-left text-sm text-muted-foreground mb-4">{creator.jobFunction}</p>
                                <Link to={`/admin/creator/pending/${creator._id}`}>
                                    <button className="bg-[#ABCAF8] text-primary-foreground hover:bg-primary/80 w-full py-2 rounded-lg">
                                        VIEW CV
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
