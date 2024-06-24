import React, { useState } from 'react';

export default function RatingCard() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center justify-center h-[370px] w-[400px] bg-[#FFEADD] p-6 rounded-lg shadow-lg">
            <div className="bg-[#FFEADD] p-6 rounded-lg w-full h-full flex flex-col">
                <h2 className="text-xl font-bold mb-4 text-center">Rate Creator</h2>
                <div className="flex justify-center mb-4">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <span
                                key={index}
                                className={`text-2xl cursor-pointer ${index <= (hover || rating) ? "text-primary" : "text-muted-foreground"}`}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
                <input type="text" placeholder="Title" className="w-full p-2 mb-4 border rounded-lg bg-input text-input-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary" />
                <textarea placeholder="Describe" className="w-full p-2 mb-4 border rounded-lg bg-input text-input-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                <button className="w-full text-white bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/80">Submit</button>
            </div>
        </div>
    );
};