import React from 'react';

export function BusFooter() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="container mx-auto flex justify-center items-center">
                <p className="text-sm">© {new Date().getFullYear()} RightClip. All rights reserved.</p>
            </div>
        </footer>
    );
}