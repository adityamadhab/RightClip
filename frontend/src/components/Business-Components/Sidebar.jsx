import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function BusSidebar() {
    const navigate = useNavigate();
    const [dashboardDropdown, setDashboardDropdown] = useState(false);
    const location = useLocation();

    const toggleDashboardDropdown = () => {
        setDashboardDropdown(!dashboardDropdown);
    };

    return (
        <div className="sticky top-0 left-0 bottom-0 w-[344px] h-screen py-0 px-4 text-white bg-[#8FD8CF] transition-all duration-500">
            <div className="logo p-[16px] mt-6">
                <img src="/Business-assests/sidelogo.png" alt="RightCliq Creator Logo" className="h-[33px]" />
            </div>
            <ul className="menu h-[88vh] relative list-none p-0">
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/business/dashboard') ? 'bg-white' : ''} hover:bg-white ${dashboardDropdown ? 'bg-white' : ''}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={toggleDashboardDropdown}>
                        <div className="flex items-center gap-3">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                                <path d="M4.0625 12.9688V4.0625H10.1563V12.9688H4.0625Z" fill="black" />
                                <path d="M14.8438 7.34375V4.0625H20.9375V7.34375H14.8438Z" fill="black" />
                                <path d="M14.8438 20.9375V12.0313H20.9375V20.9375H14.8438Z" fill="black" />
                                <path d="M4.0625 20.9375V17.6563H10.1563V20.9375H4.0625Z" fill="black" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.2813 3.125C13.2813 2.77982 13.5611 2.5 13.9063 2.5H21.875C22.2202 2.5 22.5 2.77982 22.5 3.125V8.28125C22.5 8.62643 22.2202 8.90625 21.875 8.90625H13.9063C13.5611 8.90625 13.2813 8.62643 13.2813 8.28125V3.125ZM14.8438 4.0625V7.34375H20.9375V4.0625H14.8438ZM13.2813 11.0938C13.2813 10.7486 13.5611 10.4688 13.9063 10.4688H21.875C22.2202 10.4688 22.5 10.7486 22.5 11.0938V21.875C22.5 22.2202 22.2202 22.5 21.875 22.5H13.9063C13.5611 22.5 13.2813 22.2202 13.2813 21.875V11.0938ZM14.8438 12.0313V20.9375H20.9375V12.0313H14.8438Z" fill="black" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.0938 2.5H3.125C2.77982 2.5 2.5 2.77982 2.5 3.125V13.9063C2.5 14.2514 2.77982 14.5313 3.125 14.5313H11.0938C11.4389 14.5313 11.7188 14.2514 11.7188 13.9063V3.125C11.7188 2.77982 11.4389 2.5 11.0938 2.5ZM4.0625 4.0625V12.9688H10.1563V4.0625H4.0625Z" fill="black" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.0938 16.0938H3.125C2.77982 16.0938 2.5 16.3736 2.5 16.7188V21.875C2.5 22.2202 2.77982 22.5 3.125 22.5H11.0938C11.4389 22.5 11.7188 22.2202 11.7188 21.875V16.7188C11.7188 16.3736 11.4389 16.0938 11.0938 16.0938ZM4.0625 17.6563V20.9375H10.1563V17.6563H4.0625Z" fill="black" />
                            </svg>
                            <Link to='/business/dashboard' className="text-sm text-black">Dashboard</Link>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={dashboardDropdown ? "M6 15L12 9L18 15" : "M18 9L12 15L6 9"} stroke="#222222" />
                        </svg>
                    </div>
                    {dashboardDropdown && (
                        <ul className="mt-2 ml-10">
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#8FD8CF]'>
                                <Link to='/business/dashboard/active' className="text-black text-sm no-underline">Active Assignments</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#8FD8CF]'>
                                <Link to='/business/dashboard/pending' className="text-black text-sm no-underline">Pending Assigmnets</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#8FD8CF]'>
                                <Link to='/business/dashboard/review' className="text-black text-sm no-underline">Review Assignments</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#8FD8CF]'>
                                <Link to='/business/dashboard/completed' className="text-black text-sm no-underline">Completed Assigmnets</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/business/createproject' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/business/createproject' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M22.7502 16.3333V13.9167C22.7502 12.031 22.7502 11.0882 22.1644 10.5024C21.5786 9.91666 20.6358 9.91666 18.7502 9.91666H16.2403C15.4228 9.91666 15.0141 9.91666 14.6466 9.76442C14.279 9.61217 13.99 9.32314 13.4119 8.74508L12.2551 7.58823C11.677 7.01017 11.388 6.72114 11.0204 6.5689C10.6529 6.41666 10.2441 6.41666 9.42664 6.41666H8.0835C6.19788 6.41666 5.25507 6.41666 4.66928 7.00244C4.0835 7.58823 4.0835 8.53104 4.0835 10.4167V17.5833C4.0835 19.4689 4.0835 20.4117 4.66928 20.9975C5.25507 21.5833 6.19788 21.5833 8.0835 21.5833H17.5002" stroke="#222222" />
                            <path d="M19.8335 21.5833H22.7502M22.7502 21.5833H25.6668M22.7502 21.5833V24.5M22.7502 21.5833V18.6667" stroke="#222222" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black">Create Project</span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/business/inbox') ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/business/inbox' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <rect x="4.5" y="6.75" width="18" height="13.5" rx="2" stroke="#222222" />
                            <path d="M4.5 10.125L12.6056 14.1778C13.1686 14.4593 13.8314 14.4593 14.3944 14.1778L22.5 10.125" stroke="#222222" />
                        </svg>

                        <span className="overflow-hidden text-sm text-black">Inbox</span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/business/payment' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/business/payment' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M9 9V3L18 3C18.9428 3 19.4142 3 19.7071 3.29289C20 3.58579 20 4.05719 20 5V9H9Z" stroke="#222222" stroke-linecap="round" />
                            <path d="M9 21V15H20V19C20 19.9428 20 20.4142 19.7071 20.7071C19.4142 21 18.9428 21 18 21H9Z" stroke="#222222" stroke-linecap="round" />
                            <rect x="9" y="15" width="6" height="11" transform="rotate(-90 9 15)" stroke="#222222" stroke-linecap="round" />
                            <path d="M6 21C5.05719 21 4.58579 21 4.29289 20.7071C4 20.4142 4 19.9428 4 19L4 5C4 4.05719 4 3.58579 4.29289 3.29289C4.58579 3 5.05719 3 6 3H9L9 21H6Z" stroke="#222222" stroke-linecap="round" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black">Payments</span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/business/rewards' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/business/rewards' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M19.9375 24.7708H9.0625" stroke="#222222" stroke-linecap="round" />
                            <path d="M15 22.3542C15 22.6303 14.7761 22.8542 14.5 22.8542C14.2239 22.8542 14 22.6303 14 22.3542H15ZM14 22.3542V19.3333H15V22.3542H14Z" fill="#222222" />
                            <path d="M12.6875 11.4792H16.3125" stroke="#222222" stroke-linecap="round" />
                            <path d="M6.64567 17.5208C6.64567 17.5208 4.229 15.7083 4.229 12.6875C4.229 11.7627 4.229 10.9511 4.229 10.2702C4.229 9.88351 4.229 9.69017 4.25572 9.52837C4.39529 8.683 5.05784 8.02045 5.90321 7.88088C6.06501 7.85416 6.25857 7.85416 6.64567 7.85416V7.85416C7.03278 7.85416 7.22633 7.85416 7.38813 7.88088C8.2335 8.02045 8.89605 8.683 9.03562 9.52837C9.06234 9.69017 9.06234 9.88373 9.06234 10.2708V11.4792" stroke="#222222" stroke-linecap="round" />
                            <path d="M22.3543 17.5208C22.3543 17.5208 24.771 15.7083 24.771 12.6875C24.771 11.7627 24.771 10.9511 24.771 10.2702C24.771 9.88351 24.771 9.69017 24.7443 9.52837C24.6047 8.683 23.9422 8.02045 23.0968 7.88088C22.935 7.85416 22.7414 7.85416 22.3543 7.85416V7.85416C21.9672 7.85416 21.7737 7.85416 21.6119 7.88088C20.7665 8.02045 20.1039 8.683 19.9644 9.52837C19.9377 9.69017 19.9377 9.88373 19.9377 10.2708V11.4792" stroke="#222222" stroke-linecap="round" />
                            <path d="M19.9375 14.1718V8.64584C19.9375 7.54127 19.0421 6.64584 17.9375 6.64584H11.0625C9.95793 6.64584 9.0625 7.54127 9.0625 8.64584V14.1718C9.0625 15.5092 9.7309 16.7581 10.8437 17.5L13.9453 19.5677C14.2812 19.7916 14.7188 19.7916 15.0547 19.5677L18.1563 17.5C19.2691 16.7581 19.9375 15.5092 19.9375 14.1718Z" stroke="black" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black">Rewards</span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/business/notification' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/business/notification' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-5 h-5'>
                            <path d="M7.25382 10.0906C7.60746 6.90786 10.2977 4.5 13.5 4.5V4.5C16.7023 4.5 19.3925 6.90786 19.7462 10.0906L20.0295 12.6401C20.057 12.8884 20.0708 13.0125 20.0883 13.1349C20.2271 14.1091 20.5445 15.0492 21.0244 15.9082C21.0847 16.0162 21.149 16.1233 21.2775 16.3375L21.9278 17.4213C22.6225 18.5792 22.9699 19.1582 22.7891 19.6168C22.7549 19.7035 22.7088 19.7851 22.652 19.859C22.3518 20.25 21.6766 20.25 20.3262 20.25H6.67376C5.32342 20.25 4.64824 20.25 4.34803 19.859C4.29125 19.7851 4.24509 19.7035 4.21089 19.6168C4.03008 19.1582 4.37745 18.5792 5.0722 17.4213L5.72249 16.3375C5.85103 16.1233 5.9153 16.0162 5.9756 15.9082C6.45554 15.0492 6.77289 14.1091 6.91172 13.1349C6.92916 13.0125 6.94296 12.8884 6.97055 12.6401L7.25382 10.0906Z" stroke="#222222" />
                            <path d="M10.24 20.7066C10.4323 21.5438 10.856 22.2837 11.4454 22.8113C12.0349 23.339 12.757 23.625 13.5 23.625C14.243 23.625 14.9651 23.339 15.5546 22.8113C16.144 22.2837 16.5677 21.5438 16.76 20.7066" stroke="#222222" stroke-linecap="round" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black">Notifications</span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/business/logout' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/business/logout' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z" fill="#222222" />
                            <path d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066" stroke="#222222" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black">Log Out</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
