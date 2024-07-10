import { Link } from "react-router-dom";
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
                    <h2 className="text-md font-bold mb-8 bg-[#ABCAF8] p-2 rounded-xl w-full text-center">Important Links</h2>
                    <div class="flex justify-center gap-6 items-center mb-4">
                        <Link to={'/creator/assignment'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p className="text-sm">Working Activity</p>
                        </Link>
                        <Link to={'/creator/assignment/accept'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p className="text-sm">Accept Assignment</p>
                        </Link>
                        <Link to={'/creator/assignment/timelines'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p className="text-sm">Timelines(deadlines)</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}