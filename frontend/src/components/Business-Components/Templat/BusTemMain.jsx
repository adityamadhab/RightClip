import { BusFooter } from "../BusFooter";
import BusTemNav from "./BusTemNav";

export default function BushTemMain() {
    return (
        <div>
            <div className=" bg-white w-full p-4">
                <BusTemNav />
                <div className="bg-[#FFEADD] p-12 rounded-xl">
                    <div class="flex justify-between items-center mb-6">
                        <input type="text" placeholder="Search" class="w-[500px] h-[40px] border border-input rounded-xl p-4" />
                        <button class="text-black bg-white flex items-center justify-center h-[40px] w-[240px] p-4 rounded-xl gap-4">
                            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.7502 16.3333V13.9167C22.7502 12.031 22.7502 11.0882 22.1644 10.5024C21.5786 9.91666 20.6358 9.91666 18.7502 9.91666H16.2403C15.4228 9.91666 15.0141 9.91666 14.6466 9.76442C14.279 9.61217 13.99 9.32314 13.4119 8.74508L12.2551 7.58823C11.677 7.01017 11.388 6.72114 11.0204 6.5689C10.6529 6.41666 10.2441 6.41666 9.42664 6.41666H8.0835C6.19788 6.41666 5.25507 6.41666 4.66928 7.00244C4.0835 7.58823 4.0835 8.53104 4.0835 10.4167V17.5833C4.0835 19.4689 4.0835 20.4117 4.66928 20.9975C5.25507 21.5833 6.19788 21.5833 8.0835 21.5833H17.5002" stroke="#222222" />
                                <path d="M19.8335 21.5833H22.7502M22.7502 21.5833H25.6668M22.7502 21.5833V24.5M22.7502 21.5833V18.6667" stroke="#222222" />
                            </svg>
                            <p className="text-sm">Your Templates</p>
                        </button>
                    </div>
                    <div class="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="rounded-xl h-[240px] w-[360px] bg-white overflow-hidden flex-row">
                            <h2 className="text-md p-2 h-[40px] text-center">Demo Category</h2>
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[200px] w-[360px] object-cover border-t-2 rounded-xl" />
                        </div>
                        <div className="rounded-xl h-[240px] w-[360px] bg-white overflow-hidden flex-row">
                            <h2 className="text-md p-2 h-[40px] text-center">Demo Category</h2>
                            <img src="/Templetes-assests/c2.png" alt="Demo Category" className="h-[200px] w-[360px] object-cover border-t-2 rounded-xl" />
                        </div>
                        <div className="rounded-xl h-[240px] w-[360px] bg-white overflow-hidden flex-row">
                            <h2 className="text-md p-2 h-[40px] text-center">Demo Category</h2>
                            <img src="/Templetes-assests/c3.png" alt="Demo Category" className="h-[200px] w-[360px] object-cover border-t-2 rounded-xl" />
                        </div>
                        <div className="rounded-xl h-[240px] w-[360px] bg-white overflow-hidden flex-row">
                            <h2 className="text-md p-2 h-[40px] text-center">Demo Category</h2>
                            <img src="/Templetes-assests/c4.png" alt="Demo Category" className="h-[200px] w-[360px] object-cover border-t-2 rounded-xl" />
                        </div>
                        <div className="rounded-xl h-[240px] w-[360px] bg-white overflow-hidden flex-row">
                            <h2 className="text-md p-2 h-[40px] text-center">Demo Category</h2>
                            <img src="/Templetes-assests/c1.png" alt="Demo Category" className="h-[200px] w-[360px] object-cover border-t-2 rounded-xl" />
                        </div>
                        <div className="rounded-xl h-[240px] w-[360px] bg-white overflow-hidden flex-row">
                            <h2 className="text-md p-2 h-[40px] text-center">Demo Category</h2>
                            <img src="/Templetes-assests/c4.png" alt="Demo Category" className="h-[200px] w-[360px] object-cover border-t-2 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <BusFooter />
        </div>
    )
}