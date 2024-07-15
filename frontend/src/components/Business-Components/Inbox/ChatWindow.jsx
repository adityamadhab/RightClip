import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import BusSidebar from "../Sidebar";
import BusNotiNav from "./BusInboxNav";
import ChatList from "./ChatList";
import axios from 'axios';

export function ChatWindow() {
    const { creatorId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const handleSendMessage = async () => {
        try {
            const token = localStorage.getItem('BusToken');
            const response = await axios.post(`/message/business-to-creator/${creatorId}`,
                { message },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const newMessage = response.data;
            setMessages([...messages, newMessage]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('BusToken');
            const response = await axios.get(`/message/get-messages/${creatorId}/Creator`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [creatorId]);

    useEffect(() => {
        // Scroll to the bottom of the message list
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex">
            <BusSidebar />
            <div className="min-h-screen flex-grow w-full overflow-x-hidden">
                <div className="min-h-screen flex-grow ">
                    <div className="bg-white w-full p-4 flex-grow">
                        <BusNotiNav />
                        <div className="flex flex-grow gap-2">
                            {/* Hide ChatList on mobile devices */}
                            <div className="hidden md:flex w-1/3">
                                <ChatList />
                            </div>
                            <div className="flex flex-col flex-grow bg-[#FFEADD] p-4 rounded-lg h-[600px] w-full overflow-x-hidden">
                                <div className="flex-grow overflow-auto no-scrollbar">
                                    <div className="flex flex-col space-y-4">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={`flex ${msg.senderType === 'Business' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`${msg.senderType === 'Business' ? 'bg-teal-500 text-white' : 'bg-white text-black'} p-2 rounded max-w-md overflow-x-auto`}>
                                                    <p>{msg.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </div>
                                <div className="flex items-center bg-white p-2 rounded mt-4 h-[50px] sm:h-[40px] md:h-[45px] lg:h-[50px]">
                                    <input
                                        type="text"
                                        className="flex-grow mx-2 p-2 border rounded sm:p-1 md:p-2"
                                        placeholder="Type a message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button className=" text-white rounded" onClick={handleSendMessage}>
                                        <svg width="44" height="44" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M37.5801 40.5419L30.3779 26.1375C29.2686 23.9189 28.7139 22.8096 29.2236 22.2999C29.7333 21.7903 30.8426 22.3449 33.0612 23.4542L65.6588 39.7531C67.2199 40.5336 68.0005 40.9239 68.0005 41.5419C68.0005 42.16 67.2199 42.5502 65.6588 43.3308L33.0612 59.6296C30.8426 60.7389 29.7333 61.2936 29.2236 60.7839C28.7139 60.2743 29.2686 59.1649 30.3779 56.9463L37.5801 42.5419L51.9274 42.5419C52.4797 42.5419 52.9274 42.0942 52.9274 41.5419C52.9274 40.9896 52.4797 40.5419 51.9274 40.5419L37.5801 40.5419Z" fill="#222222" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
