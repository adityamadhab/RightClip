import React from 'react';
import axios from 'axios';

export default function IndustryList({ industries, fetchIndustries }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/industry/industry-types/${id}`);
      fetchIndustries();
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  return (
    <div className='p-4 rounded shadow-md'>
      {industries.length === 0 ? (
        <p className="text-center text-gray-500">NO ADDED INDUSTRY</p>
      ) : (
        <ul className="space-y-4">
          {industries.map((industry) => (
            <li key={industry._id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p className="text-md font-semibold">{industry.name}</p>
              </div>
              <button
                onClick={() => handleDelete(industry._id)}
                className="bg-red-500 text-white font-bold py-1 px-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
