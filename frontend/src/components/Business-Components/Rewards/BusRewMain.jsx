import { BusFooter } from "../BusFooter";
import BusRewNav from "./BusRewNav";

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
        { src: "/rewards.png"},
        { src: "/rewards.png"},
        { src: "/rewards.png"},
        { src: "/rewards.png"},
        { src: "/rewards.png"},
        { src: "/rewards.png"},
        { src: "/rewards.png"},
        { src: "/rewards.png"},
    ];

    return (
        <div>
            <div className="bg-white w-full p-4">
                <BusRewNav/>
                <div className="p-14">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cards.map((card, index) => (
                            <Card key={index} src={card.src} />
                        ))}
                    </div>
                </div>
            </div>
            <BusFooter/>
        </div>
    );
}