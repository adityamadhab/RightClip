import React, { useState } from 'react';
import axios from 'axios';

export default function ProjectCategoryForm({ setShowProjectCategoryForm, fetchCategories }) {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [templateImage, setTemplateImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/category/project-categories', {
        name: category,
        templateImage,
        price
      });
      setShowProjectCategoryForm(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding project category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category Name
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="templateImage">
          Template Image URL
        </label>
        <input
          type="text"
          id="templateImage"
          value={templateImage}
          onChange={(e) => setTemplateImage(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Template Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
          Add Category
        </button>
      </div>
    </form>
  );
}
