import React, { useState } from 'react';
import axios from 'axios';

export default function CategoryList({ categories, fetchCategories }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editTemplateImage, setEditTemplateImage] = useState('');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/category/project-categories/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category._id);
    setEditName(category.name);
    setEditPrice(category.price);
    setEditTemplateImage(category.templateImage);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/category/project-categories/${id}`, {
        name: editName,
        price: editPrice,
        templateImage: editTemplateImage
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setEditName('');
    setEditPrice('');
    setEditTemplateImage('');
  };

  return (
    <div className='p-4 rounded shadow-md'>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">NO ADDED CATEGORY</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center p-2 border-b">
              {editingCategory === category._id ? (
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Category Name"
                  />
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    value={editTemplateImage}
                    onChange={(e) => setEditTemplateImage(e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Template Image URL"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(category._id)}
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
                    <p className="text-md font-semibold">{category.name}</p>
                    <p className="text-sm text-gray-600">Price: Rs.{category.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
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
