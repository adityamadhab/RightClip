import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdDashNav from '../DashBoard/AdDashNav';

export default function AssignMain() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await axios.get('/creator/approved', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setCreators(response.data);
            } catch (error) {
                console.error('Error fetching approved creators:', error);
            }
        };
        fetchCreators();
    }, []);

    return (
        <div className="bg-white w-full p-4">
            <AdDashNav />
            <div className='bg-[#FFEADD] p-8'>
                <h2 className='text-xl font-semibold mb-2'>Approved Requests</h2>
                <p className='mb-8 text-sm'>Showing approved requests</p>
                <div className="grid grid-cols-3 gap-6">
                    {creators.map((creator) => (
                        <div key={creator.id} className="bg-white p-4 rounded-lg shadow">
                            <img src={creator.image || '/insan.png'} alt={`${creator.name} profile picture`} className="rounded-full mx-auto mb-4" />
                            <h2 className="text-left text-md text-card-foreground mb-2">{`${creator.firstName} ${creator.lastName}`}</h2>
                            <p className="text-left text-sm text-muted-foreground mb-4">{creator.description}</p>
                            <button className="bg-[#ABCAF8] text-primary-foreground hover:bg-primary/80 w-full py-2 rounded-lg">
                                ASSIGN
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
