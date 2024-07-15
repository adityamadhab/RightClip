import { Link, useLocation } from "react-router-dom";

export default function CreAssInsideNav() {
    const location = useLocation();

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-4">
                <Link
                    to={'/creator/assignment'}
                    className={`text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start cursor-pointer ${location.pathname === '/creator/assignment' ? 'bg-[#ABCAF8]' : 'bg-white'}`}
                >
                    <p className="text-sm">Working Activity</p>
                </Link>
                <Link
                    to={'/creator/assignment/accept'}
                    className={`text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start cursor-pointer ${location.pathname === '/creator/assignment/accept' ? 'bg-[#ABCAF8]' : 'bg-white'}`}
                >
                    <p className="text-sm">Accept Assignment</p>
                </Link>
                <Link
                    to={'/creator/assignment/timelines'}
                    className={`text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start cursor-pointer ${location.pathname === '/creator/assignment/timelines' ? 'bg-[#ABCAF8]' : 'bg-white'}`}
                >
                    <p className="text-sm">Timelines (deadlines)</p>
                </Link>
            </div>
        </div>
    );
}
