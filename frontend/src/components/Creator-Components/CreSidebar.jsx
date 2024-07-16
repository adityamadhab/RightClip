import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CreSidebar() {
    const location = useLocation();
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        async function fetchUnreadNotificationCount() {
            try {
                const response = await axios.get('/notification/unread/count', {
                    headers: {
                        Authorization: localStorage.getItem('CreToken')
                    }
                });
                setNotificationCount(response.data.unreadCount);
            } catch (error) {
                console.error('Failed to fetch unread notification count:', error);
                return 0;
            }
        }
        fetchUnreadNotificationCount();
    }, []);

    return (
        <div className="sticky top-0 left-0 bottom-0 h-screen py-0 px-4 text-white bg-[#E7CBA3] transition-all duration-500 w-20 sm:w-[344px]">
            <div className="logo p-[16px] mt-6 ">
                <img src="/Business-assests/sidelogo.png" alt="RightCliq Creator Logo" className="h-[33px] hidden sm:block" />
            </div>
            <ul className="menu h-[88vh] relative list-none p-0">
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/creator/dashboard' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/creator/dashboard' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M4.0625 12.9688V4.0625H10.1563V12.9688H4.0625Z" fill="black" />
                            <path d="M14.8438 7.34375V4.0625H20.9375V7.34375H14.8438Z" fill="black" />
                            <path d="M14.8438 20.9375V12.0313H20.9375V20.9375H14.8438Z" fill="black" />
                            <path d="M4.0625 20.9375V17.6563H10.1563V20.9375H4.0625Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2813 3.125C13.2813 2.77982 13.5611 2.5 13.9063 2.5H21.875C22.2202 2.5 22.5 2.77982 22.5 3.125V8.28125C22.5 8.62643 22.2202 8.90625 21.875 8.90625H13.9063C13.5611 8.90625 13.2813 8.62643 13.2813 8.28125V3.125ZM14.8438 4.0625V7.34375H20.9375V4.0625H14.8438ZM13.2813 11.0938C13.2813 10.7486 13.5611 10.4688 13.9063 10.4688H21.875C22.2202 10.4688 22.5 10.7486 22.5 11.0938V21.875C22.5 22.2202 22.2202 22.5 21.875 22.5H13.9063C13.5611 22.5 13.2813 22.2202 13.2813 21.875V11.0938ZM14.8438 12.0313V20.9375H20.9375V12.0313H14.8438Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0938 2.5H3.125C2.77982 2.5 2.5 2.77982 2.5 3.125V13.9063C2.5 14.2514 2.77982 14.5313 3.125 14.5313H11.0938C11.4389 14.5313 11.7188 14.2514 11.7188 13.9063V3.125C11.7188 2.77982 11.4389 2.5 11.0938 2.5ZM4.0625 4.0625V12.9688H10.1563V4.0625H4.0625Z" fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0938 16.0938H3.125C2.77982 16.0938 2.5 16.3736 2.5 16.7188V21.875C2.5 22.2202 2.77982 22.5 3.125 22.5H11.0938C11.4389 22.5 11.7188 22.2202 11.7188 21.875V16.7188C11.7188 16.3736 11.4389 16.0938 11.0938 16.0938ZM4.0625 17.6563V20.9375H10.1563V17.6563H4.0625Z" fill="black" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black flex justify-between gap-24 items-center hidden lg:flex">
                            Dashboard
                        </span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/creator/assignment') ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/creator/assignment' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <circle cx="12" cy="8" r="4" stroke="#222222" stroke-linecap="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2759 16C13.8972 15.5613 12.3896 15.4073 10.9067 15.5538C9.26616 15.7157 7.71472 16.2397 6.45048 17.0712C5.18613 17.9028 4.25374 19.0137 3.80174 20.2789C3.70884 20.5389 3.84433 20.825 4.10438 20.9179C4.36442 21.0108 4.65054 20.8754 4.74345 20.6153C5.11048 19.588 5.88515 18.64 7 17.9067C8.11495 17.1734 9.508 16.6967 11.0049 16.5489C11.5548 16.4946 12.1076 16.4858 12.6536 16.521C13.009 16.1974 13.4814 16 14 16L15.2759 16Z" fill="#222222" />
                            <path d="M18 14L18 22" stroke="#222222" stroke-linecap="round" />
                            <path d="M22 18L14 18" stroke="#222222" stroke-linecap="round" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black flex justify-between gap-24 items-center hidden lg:flex">
                            Assignment
                        </span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/creator/inbox') ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/creator/inbox' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M9 7L13 7" stroke="#222222" stroke-linecap="round" />
                            <path d="M9 15L12 15" stroke="#222222" stroke-linecap="round" />
                            <path d="M9 11L15 11" stroke="#222222" stroke-linecap="round" />
                            <path d="M19 11V9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3H11C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H12" stroke="#222222" stroke-linecap="round" />
                            <circle cx="17.5" cy="17.5" r="2.5" stroke="#222222" stroke-linecap="round" />
                            <path d="M21 21L19.5 19.5" stroke="#222222" stroke-linecap="round" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black hidden lg:flex">
                            Messaging
                        </span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/creator/payment' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/creator/payment' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M9 9V3L18 3C18.9428 3 19.4142 3 19.7071 3.29289C20 3.58579 20 4.05719 20 5V9H9Z" stroke="#222222" stroke-linecap="round" />
                            <path d="M9 21V15H20V19C20 19.9428 20 20.4142 19.7071 20.7071C19.4142 21 18.9428 21 18 21H9Z" stroke="#222222" stroke-linecap="round" />
                            <rect x="9" y="15" width="6" height="11" transform="rotate(-90 9 15)" stroke="#222222" stroke-linecap="round" />
                            <path d="M6 21C5.05719 21 4.58579 21 4.29289 20.7071C4 20.4142 4 19.9428 4 19L4 5C4 4.05719 4 3.58579 4.29289 3.29289C4.58579 3 5.05719 3 6 3H9L9 21H6Z" stroke="#222222" stroke-linecap="round" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black hidden lg:flex">
                            Payments
                        </span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/creator/notification' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/creator/notification' className="text-white text-base no-underline flex items-center gap-3">
                        <span className="flex flex-col items-center relative">
                            {notificationCount > 0 && (
                                <span className="bg-red-600 text-white rounded-full h-3 w-3 flex items-center justify-center text-xs absolute -top-2 right-0">
                                    {notificationCount}
                                </span>
                            )}
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                                <path d="M7.25382 10.0906C7.60746 6.90786 10.2977 4.5 13.5 4.5V4.5C16.7023 4.5 19.3925 6.90786 19.7462 10.0906L20.0295 12.6401C20.057 12.8884 20.0708 13.0125 20.0883 13.1349C20.2271 14.1091 20.5445 15.0492 21.0244 15.9082C21.0847 16.0162 21.149 16.1233 21.2775 16.3375L21.9278 17.4213C22.6225 18.5792 22.9699 19.1582 22.7891 19.6168C22.7549 19.7035 22.7088 19.7851 22.652 19.859C22.3518 20.25 21.6766 20.25 20.3262 20.25H6.67376C5.32342 20.25 4.64824 20.25 4.34803 19.859C4.29125 19.7851 4.24509 19.7035 4.21089 19.6168C4.03008 19.1582 4.37745 18.5792 5.0722 17.4213L5.72249 16.3375C5.85103 16.1233 5.9153 16.0162 5.9756 15.9082C6.45554 15.0492 6.77289 14.1091 6.91172 13.1349C6.92916 13.0125 6.94296 12.8884 6.97055 12.6401L7.25382 10.0906Z" stroke="#222222" />
                                <path d="M10.24 20.7066C10.4323 21.5438 10.856 22.2837 11.4454 22.8113C12.0349 23.339 12.757 23.625 13.5 23.625C14.243 23.625 14.9651 23.339 15.5546 22.8113C16.144 22.2837 16.5677 21.5438 16.76 20.7066" stroke="#222222" stroke-linecap="round" />
                            </svg>
                        </span>
                        <span className="overflow-hidden text-sm text-black flex justify-between gap-24 items-center hidden lg:flex">
                            Notification
                        </span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/creator/logout' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/creator/logout' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z" fill="#222222" />
                            <path d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066" stroke="#222222" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black hidden lg:flex">
                            Log Out
                        </span>
                    </Link>
                </li>
            </ul>
        </div>

    );
}
