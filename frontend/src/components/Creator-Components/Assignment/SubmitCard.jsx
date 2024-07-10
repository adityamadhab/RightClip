import React, { useState } from 'react';
import axios from 'axios';

function SubmitCard({ onClose, project, onSubmitSuccess, message }) {
  const [projectLink, setProjectLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/project/upload', { projectId: project._id, projectLink }, {
        headers: {
          Authorization: localStorage.getItem('CreToken'),
        },
      });
      console.log('Project submitted successfully');
      onSubmitSuccess();
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
        {message && (
          <div className="text-center text-green-500 mb-4">{message}</div>
        )}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
              Company
            </label>
            <select
              id="projectName"
              value={project.company}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={project._id}>{project.company}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
              Industry
            </label>
            <select
              id="projectName"
              value={project.industry}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={project._id}>{project.industry}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
              Requirements
            </label>
            <select
              id="projectName"
              value={project.requirements}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={project._id}>{project.projectName}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
              Project Category
            </label>
            <select
              id="projectName"
              value={project.projectCategory}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={project._id}>{project.projectCategory}</option>
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
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
