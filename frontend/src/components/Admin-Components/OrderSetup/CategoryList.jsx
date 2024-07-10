import React from 'react';
import axios from 'axios';

export default function CategoryList({ categories, fetchCategories }) {
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

  return (
    <div className='p-4 rounded shadow-md'>
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">NO ADDED CATEGORY</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p className="text-md font-semibold">{category.name}</p>
                <p className="text-sm text-gray-600">Price: Rs.{category.price}</p>
              </div>
              <button
                onClick={() => handleDelete(category._id)}
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
