import { BusFooter } from "../BusFooter";
import BusRewNav from "./BusRewNav";
import { UnderConstruction } from "../../IndexPage-Components/UnderConstruction";
import logo from '../../../../public/Business-assests/logo.png'

const Card = ({ src }) => (
    <div className="rounded-xl h-[230px] w-[250px] bg-white overflow-hidden flex flex-col border shadow-lg">
        <img src={src} className="h-[180px] w-full object-cover border-t-2 rounded-t-md" />
        <div className="p-4 h-[50px] text-left">
            <p className="text-sm font-bold">demo</p>
        </div>
    </div>
);

export default function BusRewMain() {
    const cards = [
        { src: "/rewards.png" },
        { src: "/rewards.png" },
        { src: "/rewards.png" },
        { src: "/rewards.png" },
        { src: "/rewards.png" },
        { src: "/rewards.png" },
        { src: "/rewards.png" },
        { src: "/rewards.png" },
    ];

    return (
        <div>
            <div className="bg-white w-full p-4">
                <BusRewNav />
                <div className="flex justify-center items-center h-[550px]">
                    <div className="w-full max-w-7xl mx-auto xl:px-20 md:px-10 px-4">
                        <div className="my-10 py-5 text-center">
                            <img src={logo} alt="Company Logo" className="mx-auto mb-4 h-[50px]" />
                            <h1 className="text-sm sm:text-xl font-semibold">Developer is working on this Page</h1>
                            <p className="text-sm">Have patience</p>
                        </div>
                    </div>
                </div>
            </div>
            <BusFooter />
        </div>
    );
}