import { Link } from "react-router-dom";
import AdDashCount from "./AdDashCount";
import AdDashNav from "./AdDashNav";
import AdDashReview from "./AdDashReview";

export default function AdDashMain() {
    return (
        <div className="w-full overflow-x-hidden">
            <div className=" bg-white w-full p-4">
                <AdDashNav />
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
                        <div className="text-3xl text-white">Hi, Admin</div>
                    </div>
                </div>
                <AdDashCount />
                <h2 className="text-md font-bold mb-8 bg-[#ABCAF8] p-2 rounded-xl w-full text-center">Important Links</h2>
                <div class="p-4">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                        <Link to={'/admin/dashboard/review'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Review Projects</p>
                        </Link>
                        <Link to={'/admin/dashboard/pending'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Pending Projects</p>
                        </Link>
                        <Link to={'/admin/dashboard/ongoing'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Ongoing Projects</p>
                        </Link>
                        <Link to={'/admin/dashboard/completed'} class="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer lg:hidden">
                            <p>Completed Projects</p>
                        </Link>
                    </div>
                </div>
                <h2 className="text-md font-bold mb-8 bg-[#ABCAF8] p-2 rounded-xl w-full text-center lg:hidden">Creator Links</h2>
                <div className="p-4 lg:hidden">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                        <Link to={'/admin/creator/assign'} className="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Assign Creator</p>
                        </Link>
                        <Link to={'/admin/creator/pending'} className="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Pending Request</p>
                        </Link>
                    </div>
                </div>
                <h2 className="text-md font-bold mb-8 bg-[#ABCAF8] p-2 rounded-xl w-full text-center lg:hidden">Payment Links</h2>
                <div className="p-4 lg:hidden">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                        <Link to={'/admin/payment/creator'} className="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Creator Payments</p>
                        </Link>
                        <Link to={'/admin/payment/business'} className="text-black border border-[#929292] px-4 py-2 rounded-xl flex justify-start w-[300px] hover:bg-[#ABCAF8] cursor-pointer">
                            <p>Business Payments</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}