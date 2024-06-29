import React from 'react';
import AdDashNav from '../DashBoard/AdDashNav';

export default function PenReqMain() {
    const creators = [
        { id: 1, name: 'Creator 001', description: 'Some description', image: '/insan.png' },
        { id: 2, name: 'Creator 002', description: 'Some description', image: '/insan.png' },
        { id: 3, name: 'Creator 003', description: 'Some description', image: '/insan.png' },
        { id: 4, name: 'Creator 004', description: 'Some description', image: '/insan.png' },
        { id: 5, name: 'Creator 005', description: 'Some description', image: '/insan.png' },
        { id: 6, name: 'Creator 006', description: 'Some description', image: '/insan.png' }
    ];

    return (
        <div className="bg-white w-full p-4">
            <AdDashNav />
            <div className='bg-[#FFEADD] p-8'>
                <h2 className='text-xl font-semibold mb-2'>Pending Request</h2>
                <p className='mb-8 text-sm'>Showing Pending requests</p>
                <div className=" grid grid-cols-3 gap-6">
                    {creators.map(creator => (
                        <div key={creator.id} className="bg-white p-4 rounded-lg shadow">
                            <img src={creator.image} alt={`${creator.name} profile picture`} className="rounded-full mx-auto mb-4" />
                            <h2 className="text-left text-md text-card-foreground mb-2">{creator.name}</h2>
                            <p className="text-left text-sm text-muted-foreground mb-4">{creator.description}</p>
                            <button className="bg-[#ABCAF8] text-primary-foreground hover:bg-primary/80 w-full py-2 rounded-lg">
                                VIEW CV
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
