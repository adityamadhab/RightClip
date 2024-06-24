import { BusFooter } from "../BusFooter";
import BusDashCount from "./BusDashCount";
import BusDashDetails from "./BusDashDetails";
import BusDashNav from "./BusDashNav";

export default function BushDashMain() {
    return (
        <div>
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
                        <div className="text-3xl text-white">Hi, user</div>
                    </div>
                </div>
                <BusDashCount />
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[300px]">
                            <p>Active Assignments</p>
                            <p>(0)</p>
                        </div>
                        <div class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[300px]">
                            <p>Completed Assignments</p>
                            <p>(0)</p>
                        </div>
                        <div class="text-black border border-[#E7CBA3] px-4 py-2 rounded-xl flex justify-between w-[300px]">
                            <p>Cancelled Assignments</p>
                            <p>(0)</p>
                        </div>
                    </div>
                </div>
                <BusDashDetails />
            </div>
            <BusFooter />
        </div>
    )
}