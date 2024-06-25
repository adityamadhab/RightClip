import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Admin-Components/AdminSidebar";

export function AdminLogout() {
    return (
        <div className="flex h-screen">
            <AdminSidebar/>
            <div className="bg-white w-full p-4 flex flex-col justify-center items-center">
                <div className="border-b-2 border-[#E7CBA3] bg-white w-full mb-2">
                    <div className="bg-white mb-3 flex justify-between items-center">
                        <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1">
                                <path d="M2.66699 16L2.27656 15.6877L2.02668 16L2.27656 16.3124L2.66699 16ZM14.667 16.5C14.9431 16.5 15.167 16.2762 15.167 16C15.167 15.7239 14.9431 15.5 14.667 15.5V16.5ZM7.60989 9.021L2.27656 15.6877L3.05743 16.3124L8.39076 9.64569L7.60989 9.021ZM2.27656 16.3124L7.60989 22.979L8.39076 22.3543L3.05743 15.6877L2.27656 16.3124ZM2.66699 16.5H14.667V15.5H2.66699V16.5Z" fill="#222222" />
                                <path d="M13.333 10.8426V8.72183C13.333 7.10349 13.333 6.29432 13.807 5.73483C14.2809 5.17534 15.0791 5.04231 16.6754 4.77626L22.3466 3.83106C25.5897 3.29054 27.2113 3.02028 28.2721 3.91898C29.333 4.81767 29.333 6.46159 29.333 9.74942V22.2506C29.333 25.5384 29.333 27.1823 28.2721 28.081C27.2113 28.9797 25.5897 28.7094 22.3466 28.1689L16.6754 27.2237C15.0791 26.9577 14.2809 26.8246 13.807 26.2652C13.333 25.7057 13.333 24.8965 13.333 23.2781V21.4213" stroke="#222222" />
                            </svg>
                            <h2 className="text-lg font-extrabold text-black">Logout</h2>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center h-full w-full">
                    <div className="bg-card p-6 rounded-lg shadow-lg w-[400px] h-[200px] bg-[#FFEADD] flex flex-col justify-between">
                        <div className="text-center mt-4">
                            <p className="text-lg text-foreground">Are you sure you want to log out?</p>
                        </div>
                        <div className="flex justify-center gap-12 mt-6 space-x-4">
                            <button className="bg-white py-2 px-4 rounded-xl hover:bg-gray-50">Yes</button>
                            <button className="bg-white py-2 px-4 rounded-xl hover:bg-gray-50">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
