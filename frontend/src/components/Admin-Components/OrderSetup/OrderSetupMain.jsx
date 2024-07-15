import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OSNav from "./OSNav";
import IndustryForm from './IndustryTypeForm';
import ProjectCategoryForm from './ProjectCategoryForm';
import IndustryList from './IndustryList';
import CategoryList from './CategoryList';

export default function OrderSetupMain() {
  const [showIndustryForm, setShowIndustryForm] = useState(false);
  const [showProjectCategoryForm, setShowProjectCategoryForm] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleToggleIndustryForm = () => {
    setShowIndustryForm(!showIndustryForm);
  };

  const handleToggleProjectCategoryForm = () => {
    setShowProjectCategoryForm(!showProjectCategoryForm);
  };

  const fetchIndustries = async () => {
    try {
      const response = await axios.get('/industry/industry-types');
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/category/project-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchIndustries();
    fetchCategories();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto p-4">
        <OSNav />
        <div className="text-center mb-8">
          <p className="text-lg mb-4">Add Project Category and Industries for your clients.</p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleToggleIndustryForm} className="bg-[#ABCAF8] text-md text-black font-semibold py-2 px-4 rounded hover:bg-blue-600">
              Add Industry
            </button>
            <button onClick={handleToggleProjectCategoryForm} className="bg-[#ABCAF8] text-md text-black font-semibold py-2 px-4 rounded hover:bg-blue-600">
              Add Project Category
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FFEADD] p-4 rounded-xl shadow-md">
            <h3 className="text-md font-bold mb-4 rounded-xl">Industries</h3>
            {showIndustryForm && <IndustryForm setShowIndustryForm={setShowIndustryForm} fetchIndustries={fetchIndustries} />}
            <IndustryList industries={industries} fetchIndustries={fetchIndustries} />
          </div>
          <div className="bg-[#FFEADD] p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-4">Project Categories</h3>
            {showProjectCategoryForm && <ProjectCategoryForm setShowProjectCategoryForm={setShowProjectCategoryForm} fetchCategories={fetchCategories} />}
            <CategoryList categories={categories} fetchCategories={fetchCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}
