import React from 'react';

const TemplatePopup = ({ image, name, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-white rounded-lg p-4">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-gray-800 rounded-xl p-2 hover:bg-gray-600"
                >
                    Close
                </button>
                <img src={image} alt={name} className="max-w-full max-h-full" />
            </div>
        </div>
    );
};

export default TemplatePopup;
