import React, { useState } from 'react';
import axios from 'axios';

export default function IndustryList({ industries, fetchIndustries }) {
  const [editingIndustry, setEditingIndustry] = useState(null);
  const [editName, setEditName] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/industry/industry-types/${id}`);
      fetchIndustries();
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  const handleEdit = (industry) => {
    setEditingIndustry(industry._id);
    setEditName(industry.name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/industry/industry-types/${id}`, {
        name: editName
      });
      setEditingIndustry(null);
      fetchIndustries();
    } catch (error) {
      console.error('Error updating industry:', error);
    }
  };

  const handleCancel = () => {
    setEditingIndustry(null);
    setEditName('');
  };

  return (
    <div className='p-4 rounded shadow-md'>
      {industries.length === 0 ? (
        <p className="text-center text-gray-500">NO ADDED INDUSTRY</p>
      ) : (
        <ul className="space-y-4">
          {industries.map((industry) => (
            <li key={industry._id} className="flex justify-between items-center p-2 border-b">
              {editingIndustry === industry._id ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Industry Name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(industry._id)}
                      className="bg-green-500 text-white font-bold py-1 px-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white font-bold py-1 px-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-md font-semibold">{industry.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(industry)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(industry._id)}
                      className="bg-red-500 text-white font-bold py-1 px-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
