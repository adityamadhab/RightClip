import { useState, useEffect } from 'react';
import axios from 'axios';
import CreNotiNav from './CreNotiNav';

const NotificationItem = ({ id, time, date, message, readMark, onMarkAsRead }) => (
    <div className={`h-[60px] w-[1100px] rounded-xl flex justify-between ${readMark ? 'bg-gray-200' : 'bg-[#FFEADD]'}`}>
        <div className="flex gap-4 justify-center items-center ml-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="white" />
            </svg>
            <div>
                <p className="text-sm">{message}</p>
                <p className="text-xs text-gray-500">{date}</p>
            </div>
        </div>
        <div className="flex gap-8 justify-center items-center mr-4">
            <p className="text-sm">{time}</p>
            <button onClick={() => onMarkAsRead(id)} className="text-sm text-blue-500">
                {readMark ? 'Marked as Read' : 'Read Message'}
            </button>
        </div>
    </div>
);

export default function CreNotiMain() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/notification/get', {
                    headers: {
                        Authorization: localStorage.getItem('CreToken')
                    }
                });
                const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setNotifications(sortedNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.patch(`/notification/${id}/read`);
            setNotifications((prevNotifications) =>
                prevNotifications.map((noti) =>
                    noti._id === id ? { ...noti, readMark: true } : noti
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-white w-full p-4 flex-grow">
                <CreNotiNav />
                <div className="p-10 flex flex-col gap-6">
                    {notifications.map((noti) => (
                        <NotificationItem
                            key={noti._id}
                            id={noti._id}
                            time={new Date(noti.createdAt).toLocaleTimeString()}
                            date={new Date(noti.createdAt).toLocaleDateString()}
                            message={noti.message}
                            readMark={noti.readMark}
                            onMarkAsRead={markAsRead}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
