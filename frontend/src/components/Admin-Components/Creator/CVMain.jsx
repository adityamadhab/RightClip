import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdDashNav from '../DashBoard/AdDashNav';

export default function CVMain() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState(null);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const response = await axios.get(`/creator/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('AdminToken'),
                    },
                });
                setCreator(response.data);
            } catch (error) {
                console.error('Error fetching creator details:', error);
            }
        };
        fetchCreator();
    }, [id]);

    const handleApprove = async () => {
        try {
            await axios.put(`/creator/approve/${id}`, {}, {
                headers: {
                    Authorization: localStorage.getItem('AdminToken'),
                },
            });
            setCreator((prevCreator) => ({
                ...prevCreator,
                approval: true,
            }));
            setIsApproved(true);

            setTimeout(() => {
                navigate('/admin/creator/pending');
            }, 5000);
        } catch (error) {
            console.error('Error approving creator:', error);
        }
    };

    if (!creator) {
        return <div className='flex justify-center w-[1200px]'>Loading...</div>;
    }

    return (
        <div className="w-full overflow-x-hidden">
            <div className="bg-white w-full p-4">
                <AdDashNav />
                <div className='bg-[#F4E4CE] flex flex-col md:flex-row justify-between p-4 mt-4 rounded-lg'>
                    <div>
                        <h2 className='text-lg'>{`${creator.firstName} ${creator.lastName}`}</h2>
                        <p className='text-md'>{creator.jobFunction}</p>
                    </div>
                    <div className='bg-white rounded-lg mt-4 md:mt-0'>
                        <img src={creator.image || '/insan.png'} alt="Profile" className="rounded-full mx-auto mb-4 h-[180px] w-full md:w-[280px]" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                    <div className="bg-[#FFD6BE] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                        <div className="text-lg">Resume</div>
                        <a href={creator.resume} className="text-md rounded-lg bg-[#ABCAF8] text-center p-4" download>Download</a>
                    </div>
                    <div className="bg-[#FFD6BE] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                        <div className="text-lg">Work Sample</div>
                        <a href={creator.workSample} className="text-md rounded-lg bg-[#ABCAF8] text-center p-4" download>Download</a>
                    </div>
                    <div className="bg-[#FFD6BE] p-4 rounded-lg h-[174px] flex flex-col justify-between">
                        <div className="text-lg">Work Experience</div>
                        <div className="text-xl">{creator.experience}</div>
                    </div>
                </div>
                <div className="bg-[#F4E4CE] p-4 md:p-10 flex flex-col gap-3 mt-6">
                    <div className="h-[60px] w-full md:w-[1100px] bg-white rounded-xl flex justify-between items-center px-4">
                        <div className="flex gap-4 items-center">
                            <p className="text-sm">Contact</p>
                        </div>
                        <div className="text-sm truncate">{creator.phone}</div>
                    </div>
                    <div className="h-[60px]  w-full md:w-[1100px] bg-white rounded-xl flex justify-between items-center px-4">
                        <div className="flex gap-4 items-center">
                            <p className="text-sm">Email</p>
                        </div>
                        <a href={`mailto:${creator.email}`} className="ml-5 text-sm truncate" target="_blank" rel="noopener noreferrer">{creator.email}</a>
                    </div>
                    <div className="h-[60px] w-full md:w-[1100px] bg-white rounded-xl flex justify-between items-center px-4">
                        <div className="flex gap-4 items-center">
                            <p className="text-sm">LinkedIn</p>
                        </div>
                        <a href={creator.linkedin} className="text-sm truncate" target="_blank" rel="noopener noreferrer">{creator.linkedin}</a>
                    </div>
                    <div className="h-[60px] w-full md:w-[1100px] bg-white rounded-xl flex justify-between items-center px-4">
                        <div className="flex gap-4 items-center">
                            <p className="text-sm">Industry</p>
                        </div>
                        <div className="text-sm truncate">{creator.industry}</div>
                    </div>
                </div>
                <div className='flex justify-center mt-6'>
                    {!creator.approval ? (
                        <button className='text-lg rounded-lg bg-[#ABCAF8] text-center p-4' onClick={handleApprove}>
                            Approve
                        </button>
                    ) : (
                        <button className='text-lg rounded-lg bg-green-500 text-center p-4' disabled>
                            Approved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
