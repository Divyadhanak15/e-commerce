import React, { useState } from "react";
import './Category.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = () => {
    setCategories([...categories, { name: categoryName }]);
    setCategoryName("");
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="categories-container">
      <h2>Manage Categories</h2>
      <div className="category-input">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="category-list">
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              {category.name} <button onClick={() => handleDeleteCategory(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
