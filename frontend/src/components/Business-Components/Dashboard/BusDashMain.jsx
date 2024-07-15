import { BusFooter } from "../BusFooter";
import BusDashCount from "./BusDashCount";
import BusDashNav from "./BusDashNav";

export default function BushDashMain({ username }) {
    return (
        <div className="w-full overflow-x-hidden">
            <div className=" bg-white w-full p-4">
                <BusDashNav />
                <div
                    className="p-6 rounded-lg shadow-md mb-6"
                    style={{
                        backgroundImage: 'url(/Business-assests/userback.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '233px',
                        borderRadius: '12px'
                    }}
                >
                    <div className="flex items-center space-x-4">
                        <div className="text-3xl text-white">Hi, {username}</div>
                    </div>
                </div>
                <BusDashCount />
            </div>
            <BusFooter />
        </div>
    )
}