import { Link, useLocation } from "react-router-dom";

export default function TimelineNav() {
    const location = useLocation();

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-4">
                <Link
                    to={'/creator/assignment/timelines'}
                    className={`text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start cursor-pointer ${location.pathname === '/creator/assignment/timelines' ? 'bg-[#ABCAF8]' : 'bg-white'}`}
                >
                    <p className="text-sm">Submit Work</p>
                </Link>
                <Link
                    to={'/creator/assignment/timelines/feedback'}
                    className={`text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start cursor-pointer ${location.pathname === '/creator/assignment/timelines/feedback' ? 'bg-[#ABCAF8]' : 'bg-white'}`}
                >
                    <p className="text-sm">View Feedback</p>
                </Link>
                <Link
                    to={'/creator/assignment/timelines/status'}
                    className={`text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start cursor-pointer ${location.pathname === '/creator/assignment/timelines/status' ? 'bg-[#ABCAF8]' : 'bg-white'}`}
                >
                    <p className="text-sm">Status of Change</p>
                </Link>
            </div>
        </div>
    );
}
