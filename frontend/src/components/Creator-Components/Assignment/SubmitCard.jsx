import React, { useState } from 'react';
import axios from 'axios';

function SubmitCard({ onClose, project }) {
  const [projectLink, setProjectLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/project/upload', { projectId: project._id, projectLink }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log('Project submitted successfully');
      onClose();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Submit Project</h2>
          <button onClick={onClose} className="text-black font-bold">X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
              Project name
            </label>
            <select
              id="projectName"
              value={project.projectName}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={project._id}>{project.projectName}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectLink">
              Project link
            </label>
            <input
              id="projectLink"
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitCard;
