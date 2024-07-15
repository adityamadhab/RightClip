import { Link } from "react-router-dom";

export default function BusNotiNav() {
    return (
        <div className="border-b-2 border-[#E7CBA3] bg-white w-full sm:w-[1200px] mb-6">
            <div className="bg-white mb-3 flex justify-between items-center">
                <Link to={'/dashboard'} className="header--title cursor-pointer flex gap-4">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1">
                        <path d="M11.2837 15.6965C11.4486 14.2127 11.531 13.4708 11.706 12.845C12.5447 9.8467 15.0467 7.60727 18.1194 7.10485C18.7606 7 19.5071 7 21 7V7C22.4929 7 23.2394 7 23.8806 7.10485C26.9533 7.60727 29.4553 9.8467 30.294 12.845C30.469 13.4708 30.5514 14.2127 30.7163 15.6965L31.1569 19.6624C31.3065 21.0088 31.3813 21.682 31.5656 22.3275C31.6351 22.5708 31.7161 22.8107 31.8083 23.0463C32.0529 23.6715 32.4014 24.2523 33.0984 25.4139L34.9326 28.471C35.7384 29.8139 36.1412 30.4854 35.854 30.9927C35.5668 31.5 34.7837 31.5 33.2176 31.5H8.78238C7.21627 31.5 6.43322 31.5 6.14599 30.9927C5.85876 30.4854 6.26164 29.8139 7.0674 28.471L8.90165 25.4139C9.59862 24.2523 9.94711 23.6715 10.1917 23.0463C10.2839 22.8107 10.3649 22.5708 10.4344 22.3275C10.6187 21.682 10.6935 21.0088 10.8431 19.6624L11.2837 15.6965Z" stroke="#222222" />
                        <path d="M15.9289 32.2103C16.228 33.5126 16.8871 34.6635 17.804 35.4843C18.7209 36.3051 19.8443 36.75 21 36.75C22.1557 36.75 23.2791 36.3051 24.196 35.4843C25.1129 34.6635 25.772 33.5126 26.0711 32.2103" stroke="#222222" stroke-linecap="round" />
                    </svg>
                    <h2 className="text-lg font-extrabold text-black hidden sm:block">Notification</h2>
                    <h2 className="text-sm font-bold text-black sm:hidden mt-1">Notification</h2>
                </Link>
            </div>
        </div>
    )
}