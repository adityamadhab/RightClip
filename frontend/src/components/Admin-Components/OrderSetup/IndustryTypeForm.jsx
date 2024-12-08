import { useState } from 'react';
import axios from 'axios';

export default function IndustryForm({ setShowIndustryForm, fetchIndustries }) {
  const [industry, setIndustry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/industry/industry-types', { name: industry });
      setShowIndustryForm(false);
      fetchIndustries();
    } catch (error) {
      console.error('Error adding industry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-lg font-bold mb-4">Add Industry</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
          Industry Name
        </label>
        <input
          type="text"
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
          Add Industry
        </button>
      </div>
    </form>
  );
}
