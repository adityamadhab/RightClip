import { Link } from "react-router-dom";

export default function PaymentsNav() {
    return (
        <div className="border-b-2 border-[#E7CBA3] bg-white w-[1200px] mb-6">
            <div className="bg-white mb-3 flex justify-between items-center">
                <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 -mt-12'>
                        <path d="M9 9V3L18 3C18.9428 3 19.4142 3 19.7071 3.29289C20 3.58579 20 4.05719 20 5V9H9Z" stroke="#222222" stroke-linecap="round" />
                        <path d="M9 21V15H20V19C20 19.9428 20 20.4142 19.7071 20.7071C19.4142 21 18.9428 21 18 21H9Z" stroke="#222222" stroke-linecap="round" />
                        <rect x="9" y="15" width="6" height="11" transform="rotate(-90 9 15)" stroke="#222222" stroke-linecap="round" />
                        <path d="M6 21C5.05719 21 4.58579 21 4.29289 20.7071C4 20.4142 4 19.9428 4 19L4 5C4 4.05719 4 3.58579 4.29289 3.29289C4.58579 3 5.05719 3 6 3H9L9 21H6Z" stroke="#222222" stroke-linecap="round" />
                    </svg>
                    <h2 className="text-lg font-extrabold text-black">Payments</h2>
                </Link>
            </div>
        </div>
    )
}