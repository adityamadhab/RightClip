import { Link } from "react-router-dom";

export default function BusRewNav() {
    return (
        <div className="border-b-2 border-[#E7CBA3] bg-white w-[1200px] mb-6">
            <div className="bg-white mb-3 flex justify-between items-center">
                <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1">
                        <path d="M24.0625 29.8958H10.9375" stroke="#222222" stroke-linecap="round" />
                        <path d="M18 26.9792C18 27.2553 17.7761 27.4792 17.5 27.4792C17.2239 27.4792 17 27.2553 17 26.9792H18ZM17 26.9792V23.3333H18V26.9792H17Z" fill="#222222" />
                        <path d="M15.3125 13.8542H19.6875" stroke="#222222" stroke-linecap="round" />
                        <path d="M8.02116 21.1458C8.02116 21.1458 5.10449 18.9583 5.10449 15.3125C5.10449 14.1963 5.10449 13.2169 5.10449 12.395C5.10449 11.5418 5.10449 11.1152 5.23268 10.7747C5.43556 10.2356 5.86096 9.81022 6.39999 9.60734C6.74058 9.47916 7.16744 9.47916 8.02116 9.47916V9.47916C8.87488 9.47916 9.30174 9.47916 9.64233 9.60734C10.1814 9.81022 10.6068 10.2356 10.8096 10.7747C10.9378 11.1152 10.9378 11.5421 10.9378 12.3958V13.8542" stroke="#222222" stroke-linecap="round" />
                        <path d="M26.9788 21.1458C26.9788 21.1458 29.8955 18.9583 29.8955 15.3125C29.8955 14.1963 29.8955 13.2169 29.8955 12.395C29.8955 11.5418 29.8955 11.1152 29.7673 10.7747C29.5644 10.2356 29.139 9.81022 28.6 9.60734C28.2594 9.47916 27.8326 9.47916 26.9788 9.47916V9.47916C26.1251 9.47916 25.6983 9.47916 25.3577 9.60734C24.8186 9.81022 24.3932 10.2356 24.1904 10.7747C24.0622 11.1152 24.0622 11.5421 24.0622 12.3958V13.8542" stroke="#222222" stroke-linecap="round" />
                        <path d="M24.0625 17.5468V10.0208C24.0625 8.91627 23.1671 8.02084 22.0625 8.02084H12.9375C11.8329 8.02084 10.9375 8.91628 10.9375 10.0208V17.5468C10.9375 18.8842 11.6059 20.1331 12.7187 20.875L16.9453 23.6927C17.2812 23.9166 17.7188 23.9166 18.0547 23.6927L22.2813 20.875C23.3941 20.1331 24.0625 18.8842 24.0625 17.5468Z" stroke="black" />
                    </svg>
                    <h2 className="text-lg font-extrabold text-black">Rewards</h2>
                </Link>
            </div>
        </div>
    )
}