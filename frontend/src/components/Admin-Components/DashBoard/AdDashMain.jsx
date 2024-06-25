import AdDashCount from "./AdDashCount";
import AdDashNav from "./AdDashNav";
import AdDashReview from "./AdDashReview";

export default function AdDashMain() {
    return (
        <div>
            <div className=" bg-white w-full p-4">
                <AdDashNav/>
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
                <AdDashCount/>
                <div class="p-4">
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-black bg-[#ABCAF8] px-4 py-2 rounded-xl flex justify-center w-[300px]">
                            <p>Submitted Projects</p>
                        </div>
                        <div class="text-black bg-[#ABCAF8] px-4 py-2 rounded-xl flex justify-center w-[300px]">
                            <p>For Remarks</p>
                        </div>
                        <div class="text-black bg-[#ABCAF8] px-4 py-2 rounded-xl flex justify-center w-[300px]">
                            <p>Cancelled</p>
                        </div>
                    </div>
                </div>
                <AdDashReview/>
            </div>
        </div>
    )
}