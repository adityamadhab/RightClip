import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

export default function ChatList() {
    const [creators, setCreators] = useState([]);
    const location = useLocation();
    const currentChat = location.pathname.split('/').pop();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to Socket.IO server
        const newSocket = io('http://localhost:3000', {
            auth: {
                token: localStorage.getItem('BusToken')
            }
        });
        setSocket(newSocket);

        // Cleanup on unmount
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const response = await axios.get('/project/business/assigned-creators', {
                    headers: {
                        Authorization: localStorage.getItem('BusToken')
                    }
                });
                setCreators(response.data);
            } catch (error) {
                console.error('Error fetching creators:', error);
            }
        };

        fetchCreators();

        // Listen for new messages
        if (socket) {
            socket.on('newMessage', (message) => {
                // Refresh the creators list when a new message is received
                fetchCreators();
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
            <Link to={'/business/inbox'}>
                <h2 className="font-bold mb-4">CHAT LIST</h2>
            </Link>
            <ul className="space-y-2">
                {creators.map((creator) => (
                    <Link
                        to={`/business/inbox/${creator.creatorId}`}
                        key={creator.creatorId}
                        className={`bg-white p-2 rounded-xl flex items-center space-x-2 border border-blue-400 cursor-pointer ${currentChat === creator.creatorId ? 'bg-teal-400' : ''}`}
                    >
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="flex-grow text-sm">
                            <h4 className={`text-sm ${currentChat === creator.creatorId ? 'text-black' : 'text-gray-500'}`}>
                                {creator.firstName} {creator.lastName}
                            </h4>
                            <p className={`text-sm ${currentChat === creator.creatorId ? 'text-white' : 'text-gray-500'}`}>Assigned for: {creator.projects.join(', ')}</p>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
