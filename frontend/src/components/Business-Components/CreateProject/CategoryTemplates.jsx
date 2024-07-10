import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TemplatePopup from './TemplatePopup';

const CategoryTemplates = ({ selectedCategory }) => {
    const [templates, setTemplates] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            if (!selectedCategory) return;

            try {
                const token = localStorage.getItem('BusToken');
                const response = await axios.get(`/category/templates/${selectedCategory}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, [selectedCategory]);

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedTemplate(null);
    };

    return (
        <div className="w-full lg:w-1/3 bg-[#FFEADD]  p-6 rounded-xl shadow-md">
            <p className='text-center font-bold text-black text-xl'>TEMPLETES</p>
            {!selectedCategory ? (
                <div className="mt-48 text-center text-gray-500 text-lg">
                    <p className="text-xL">SELECT A CATEGORY FIRST</p>
                </div>
            ) : (
                <div className="mt-32 flex flex-col items-center justify-center w-full">
                    {templates.map((template, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-white overflow-hidden flex flex-col items-center shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                            onClick={() => handleTemplateClick(template)}
                        >
                            <img
                                src={template.templateImage}
                                alt={template.name}
                                className="h-40 w-full object-cover border-b-2"
                            />
                            <div className="p-4 flex flex-col items-center">
                                <h2 className="text-lg font-semibold">{template.name}</h2>
                                <p className="text-gray-500 mt-2">Price: Rs.{template.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showPopup && selectedTemplate && (
                <TemplatePopup
                    image={selectedTemplate.templateImage}
                    name={selectedTemplate.name}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default CategoryTemplates;
