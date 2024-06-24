import { Link } from "react-router-dom";

export default function BusTemNav() {
    return (
        <div className="border-b-2 border-[#E7CBA3] bg-white w-[1200px] mb-6">
            <div className="bg-white mb-3 flex justify-between items-center">
                <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1">
                        <path d="M9 7V1L18 1C18.9428 1 19.4142 1 19.7071 1.29289C20 1.58579 20 2.05719 20 3V7L9 7Z" stroke="#222222" stroke-linecap="round" />
                        <path d="M9 19V13H20V17C20 17.9428 20 18.4142 19.7071 18.7071C19.4142 19 18.9428 19 18 19H9Z" stroke="#222222" stroke-linecap="round" />
                        <rect x="9" y="13" width="6" height="11" transform="rotate(-90 9 13)" stroke="#222222" stroke-linecap="round" />
                        <path d="M6 19C5.05719 19 4.58579 19 4.29289 18.7071C4 18.4142 4 17.9428 4 17L4 3C4 2.05719 4 1.58579 4.29289 1.29289C4.58579 1 5.05719 1 6 1H9L9 19H6Z" stroke="#222222" stroke-linecap="round" />
                    </svg>
                    <h2 className="text-lg font-extrabold text-black">Templates</h2>
                </Link>
            </div>
        </div>
    )
}