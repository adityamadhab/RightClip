import { useState } from 'react';
import { BusFooter } from "../BusFooter";
import BusRatNav from "./BusRatNav";
import RatingCard from './RatingCard';

const Card = ({ src, title, onClick }) => (
    <div className="rounded-md h-[250px] w-[280px] bg-white overflow-hidden flex flex-col cursor-pointer" onClick={onClick}>
        <img src={src} alt={title} className="h-[180px] w-full object-cover border-t-2 rounded-t-md" />
        <div className="p-4 h-[70px] text-left">
            <p className="text-md">{title}</p>
            <p className="text-sm text-gray-400">MORE INFO</p>
        </div>
    </div>
);

export default function BushRatMain() {
    const [selectedCreator, setSelectedCreator] = useState(null);
    const [showRating, setShowRating] = useState(false);

    const cards = [
        { src: "/Ratings-assests/c1.png", title: "Creator 1" },
        { src: "/Ratings-assests/c2.png", title: "Creator 2" },
        { src: "/Ratings-assests/c3.png", title: "Creator 3" },
        { src: "/Ratings-assests/c2.png", title: "Creator 4" },
        { src: "/Ratings-assests/c3.png", title: "Creator 5" },
        { src: "/Ratings-assests/c1.png", title: "Creator 6" },
    ];

    const handleCardClick = (card) => {
        setSelectedCreator(card);
        setShowRating(true);
    };

    const closeRating = () => {
        setShowRating(false);
    };

    return (
        <div>
            <div className="bg-white w-full p-4">
                <BusRatNav />
                <div className="bg-[#FFEADD] p-14">
                    <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <Card key={index} src={card.src} title={card.title} onClick={() => handleCardClick(card)} />
                        ))}
                    </div>
                </div>
            </div>
            <BusFooter />
            {showRating && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative">
                        <button onClick={closeRating} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 h-8 w-8">
                            ×
                        </button>
                        <RatingCard />
                    </div>
                </div>
            )}
        </div>
    );
}
