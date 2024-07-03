import CreDashCount from "./CreDashCount";
import CreDashNav from "./CreDashNav";

export default function CreDashMain({username}) {
    return (
        <div>
            <div className=" bg-white w-full p-4">
                <CreDashNav />
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
                <CreDashCount />
                <div class="p-4">
                    <div class="flex justify-start gap-6 items-center mb-4">
                        <div class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-gray-300 cursor-pointer">
                            <p className="text-sm">Working Activity</p>
                        </div>
                        <div class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-gray-300 cursor-pointer">
                            <p className="text-sm">Timelines(deadlines)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}