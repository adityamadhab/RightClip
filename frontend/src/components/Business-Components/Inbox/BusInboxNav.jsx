import { Link } from "react-router-dom";

export default function BusNotiNav() {
    return (
        <div className="border-b-2 border-[#E7CBA3] bg-white w-full sm:w-[1200px] mb-6">
            <div className="bg-white mb-3 flex justify-between items-center">
                <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1">
                        <rect x="6.6665" y="10" width="26.6667" height="20" rx="2" stroke="#222222" />
                        <path d="M6.6665 15L19.1054 21.2195C19.6685 21.501 20.3312 21.501 20.8943 21.2195L33.3332 15" stroke="#222222" />
                    </svg>
                    <h2 className="text-lg font-extrabold text-black hidden sm:block">Inbox</h2>
                    <h2 className="text-sm font-bold text-black sm:hidden mt-1">Inbox</h2>
                </Link>
            </div>
        </div>
    )
}