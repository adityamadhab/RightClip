import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
    const [dashboardDropdown, setDashboardDropdown] = useState(false);
    const [creatorDropdown, setCreatorDropdown] = useState(false);
    const [paymentDropdown, setPaymentDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDashboardDropdown = () => {
        setDashboardDropdown(!dashboardDropdown);
    };

    const toggleCreatorDropdown = () => {
        setCreatorDropdown(!creatorDropdown);
    };

    const togglePaymentDropdown = () => {
        setPaymentDropdown(!paymentDropdown);
    };

    return (
        <div className="sticky top-0 left-0 bottom-0 h-screen py-0 px-4 text-white bg-[#E7CBA3] transition-all duration-500 w-20 sm:w-[344px]">
            <div className="logo p-[16px] mt-6 ">
                <img src="/Business-assests/sidelogo.png" alt="RightCliq Creator Logo" className="h-[33px] hidden sm:block" />
            </div>
            <ul className="menu h-[88vh] relative list-none p-0">
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/admin/dashboard') ? 'bg-white' : ''} hover:bg-white ${dashboardDropdown ? 'bg-white' : ''}`}>
                    <Link to={'/admin/dashboard'} className="flex items-center justify-between cursor-pointer" onClick={toggleDashboardDropdown}>
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
                            <Link to='/admin/dashboard' className="text-sm text-black hidden lg:block">Dashboard</Link>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={dashboardDropdown ? "M6 15L12 9L18 15" : "M18 9L12 15L6 9"} stroke="#222222" />
                        </svg>
                    </Link>
                    {dashboardDropdown && (
                        <ul className="mt-2 ml-10 hidden lg:block">
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/dashboard/ongoing' className="text-black text-sm no-underline">Ongoing Projects</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/dashboard/review' className="text-black text-sm no-underline">Review Projects</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/dashboard/completed' className="text-black text-sm no-underline">Completed Projects</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/dashboard/pending' className="text-black text-sm no-underline">Pending Projects</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/admin/creator') ? 'bg-white' : ''} hover:bg-white ${creatorDropdown ? 'bg-white' : ''}`}>
                    <div className="flex items-center justify-between cursor-pointer" onClick={toggleCreatorDropdown}>
                        <Link to={'/admin/creator/assign'} className="flex items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                                <circle cx="12" cy="8" r="4" stroke="#222222" stroke-linecap="round" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2759 16C13.8972 15.5613 12.3896 15.4073 10.9067 15.5538C9.26616 15.7157 7.71472 16.2397 6.45048 17.0712C5.18613 17.9028 4.25374 19.0137 3.80174 20.2789C3.70884 20.5389 3.84433 20.825 4.10438 20.9179C4.36442 21.0108 4.65054 20.8754 4.74345 20.6153C5.11048 19.588 5.88515 18.64 7 17.9067C8.11495 17.1734 9.508 16.6967 11.0049 16.5489C11.5548 16.4946 12.1076 16.4858 12.6536 16.521C13.009 16.1974 13.4814 16 14 16L15.2759 16Z" fill="#222222" />
                                <path d="M18 14L18 22" stroke="#222222" stroke-linecap="round" />
                                <path d="M22 18L14 18" stroke="#222222" stroke-linecap="round" />
                            </svg>
                            <Link to='/admin/creator/assign' className="text-sm text-black hidden lg:block">Creator</Link>
                        </Link>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={creatorDropdown ? "M6 15L12 9L18 15" : "M18 9L12 15L6 9"} stroke="#222222" />
                        </svg>
                    </div>
                    {creatorDropdown && (
                        <ul className="mt-2 ml-10 hidden lg:block">
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/creator/assign' className="text-black text-sm no-underline">Assign Creator</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/creator/pending' className="text-black text-sm no-underline">Pending Requests</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/admin/ordersetup' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/admin/ordersetup' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M9 7L13 7" stroke="#222222" stroke-linecap="round" />
                            <path d="M9 15L12 15" stroke="#222222" stroke-linecap="round" />
                            <path d="M9 11L15 11" stroke="#222222" stroke-linecap="round" />
                            <path d="M19 11V9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3H11C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H12" stroke="#222222" stroke-linecap="round" />
                            <circle cx="17.5" cy="17.5" r="2.5" stroke="#222222" stroke-linecap="round" />
                            <path d="M21 21L19.5 19.5" stroke="#222222" stroke-linecap="round" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black flex justify-between gap-24 items-center hidden lg:flex">
                            Order Setup
                        </span>
                    </Link>
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname.startsWith('/admin/payment') ? 'bg-white' : ''} hover:bg-white ${paymentDropdown ? 'bg-white' : ''}`}>
                    <Link to={'/admin/payment/business'} className="flex items-center justify-between cursor-pointer" onClick={togglePaymentDropdown}>
                        <div className="flex items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                                <circle cx="12" cy="8" r="4" stroke="#222222" stroke-linecap="round" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2759 16C13.8972 15.5613 12.3896 15.4073 10.9067 15.5538C9.26616 15.7157 7.71472 16.2397 6.45048 17.0712C5.18613 17.9028 4.25374 19.0137 3.80174 20.2789C3.70884 20.5389 3.84433 20.825 4.10438 20.9179C4.36442 21.0108 4.65054 20.8754 4.74345 20.6153C5.11048 19.588 5.88515 18.64 7 17.9067C8.11495 17.1734 9.508 16.6967 11.0049 16.5489C11.5548 16.4946 12.1076 16.4858 12.6536 16.521C13.009 16.1974 13.4814 16 14 16L15.2759 16Z" fill="#222222" />
                                <path d="M18 14L18 22" stroke="#222222" stroke-linecap="round" />
                                <path d="M22 18L14 18" stroke="#222222" stroke-linecap="round" />
                            </svg>
                            <Link to='/admin/payment/business' className="text-sm text-black hidden lg:block">Payments</Link>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d={paymentDropdown ? "M6 15L12 9L18 15" : "M18 9L12 15L6 9"} stroke="#222222" />
                        </svg>
                    </Link>
                    {paymentDropdown && (
                        <ul className="mt-2 ml-10 hidden lg:block">
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/payment/business' className="text-black text-sm no-underline">Business Payments</Link>
                            </li>
                            <li className='p-2 my-1 rounded-lg transition duration-500 ease-in-out hover:bg-[#E7CBA3]'>
                                <Link to='/admin/payment/creator' className="text-black text-sm no-underline">Creator Payments</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className={`p-3 my-2 rounded-lg transition duration-500 ease-in-out ${location.pathname === '/admin/logout' ? 'bg-white' : ''} hover:bg-white`}>
                    <Link to='/admin/logout' className="text-white text-base no-underline flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5'>
                            <path d="M2 12L1.60957 11.6877L1.35969 12L1.60957 12.3123L2 12ZM11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5V12.5ZM5.60957 6.68765L1.60957 11.6877L2.39043 12.3123L6.39043 7.31235L5.60957 6.68765ZM1.60957 12.3123L5.60957 17.3123L6.39043 16.6877L2.39043 11.6877L1.60957 12.3123ZM2 12.5H11V11.5H2V12.5Z" fill="#222222" />
                            <path d="M10 8.13193V7.38851C10 5.77017 10 4.961 10.474 4.4015C10.9479 3.84201 11.7461 3.70899 13.3424 3.44293L15.0136 3.1644C18.2567 2.62388 19.8782 2.35363 20.9391 3.25232C22 4.15102 22 5.79493 22 9.08276V14.9172C22 18.2051 22 19.849 20.9391 20.7477C19.8782 21.6464 18.2567 21.3761 15.0136 20.8356L13.3424 20.5571C11.7461 20.291 10.9479 20.158 10.474 19.5985C10 19.039 10 18.2298 10 16.6115V16.066" stroke="#222222" />
                        </svg>
                        <span className="overflow-hidden text-sm text-black flex justify-between gap-24 items-center hidden lg:flex">
                            Logout
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
