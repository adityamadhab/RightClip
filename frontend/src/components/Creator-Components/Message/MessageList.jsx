import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

export default function MessageList() {
    const [creators, setCreators] = useState([]);
    const location = useLocation();
    const currentChat = location.pathname.split('/').pop();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            auth: {
                token: localStorage.getItem('CreToken')
            }
        });
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    const fetchCreators = async () => {
        try {
            const response = await axios.get('/project/creator/assigned-businesses', {
                headers: {
                    Authorization: localStorage.getItem('CreToken')
                }
            });
            setCreators(response.data);
        } catch (error) {
            console.error('Error fetching creators:', error);
        }
    };

    useEffect(() => {
        fetchCreators();

        if (socket) {
            socket.on('newMessage', () => {
                fetchCreators(); // Refresh list when new message arrives
            });
        }

        return () => {
            if (socket) {
                socket.off('newMessage');
            }
        };
    }, [socket]);

    return (
        <div className="border border-[#8FD8CF] rounded-lg h-[600px] w-[300px] p-4">
            <Link to={'/creator/inbox'}>
                <h2 className="font-bold mb-4">CHAT LIST</h2>
            </Link>
            <ul className="space-y-2">
                {creators.map((creator) => (
                    <Link
                        to={`/creator/inbox/${creator.businessId}`}
                        key={creator.businessId}
                        className={`bg-white p-2 rounded-xl flex items-center space-x-2 border border-blue-400 cursor-pointer ${currentChat === creator.businessId ? 'bg-teal-400' : ''}`}
                    >
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-grow text-sm">
                            <h4 className={`text-sm ${currentChat === creator.businessId ? 'text-black' : 'text-gray-500'}`}>
                                {creator.companyName}
                            </h4>
                            <p className={`text-sm ${currentChat === creator.businessId ? 'text-white' : 'text-gray-500'}`}>Business for: {creator.projects.join(', ')}</p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
