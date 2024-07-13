import React from 'react';

export function BusFooter() {
    return (
        <footer className="bg-[#FFC098] text-black py-4 w-full">
            <div className="container mx-auto flex justify-center items-center">
                <p className="text-sm">© {new Date().getFullYear()} RightCliq. All rights reserved.</p>
            </div>
        </footer>
    );
}