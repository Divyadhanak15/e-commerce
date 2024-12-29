import React, { useState } from 'react';
import './Home.css';

import home from './../assets/home-logo.jpg';
import sofa from './../assets/sofaCum.jpg';
import tableLamp from './../assets/tableLamp.jpg';
import container from './../assets/container.jpg';
import mattress from './../assets/mattress.jpg';
import rack from './../assets/rack.jpg';
import carpet from './../assets/carpet.jpg';
import ballLight from './../assets/ballLight.jpg';
import container1 from './../assets/container1.jpg';

const DisplayProducts = () => {
  const staticProducts = [
    {
      image: home,
      name: 'Coffee Table',
      category: 'Furniture',
      description:
        'TAXOZY Square Coffee Table Set of 2 Modern Minimalist Style Furniture for Living Room Engineered Wood Coffee Table',
      price: 2265.0,
    },
    {
      image: sofa,
      name: 'Sofa Cum Bed',
      category: 'Furniture',
      description:
        'Solis Primus-comfort for all 4X6 size for 2 Person- Moshi Fabric Washable Cover 2 Seater Double Foam Fold Out Sofa Cum Bed',
      price: 5699,
    },
    {
      image: tableLamp,
      name: 'Table Lamp',
      category: 'Lighting',
      description:
        'HSH FASHION Touch Dimmable Table Light / Rose diamond table lamp Table Lamp (Multicolor) Night Lamp',
      price: 355.0,
    },
    {
      image: container,
      name: 'Container',
      category: 'Kitchen',
      description: 'PANELS Glass Grocery Container 1100 ml',
      price: 348,
    },
    {
      image: mattress,
      name: 'Form Mattress',
      category: 'Bedding',
      description: 'Wakefit EcoLatex Classic 8 inch Single Latex Foam Mattress',
      price: 7439,
    },
    {
      image: rack,
      name: 'Rack',
      category: 'Kitchen',
      description:
        'PEXMON Utensil Kitchen Rack Steel Stainless Steel Multipurpose Kitchen Corner Shelf Rack Stand',
      price: 198,
    },
    {
      image: carpet,
      name: 'Polypropylene Carpet',
      category: 'Home-Decor',
      description: 'COMFY HOME Green Polypropylene Carpet',
      price: 210,
    },
    {
      image: ballLight,
      name: 'Crystal Ball Night Light',
      category: 'Lighting',
      description:
        'VN Fashion 3D Space Galaxy Planet Crystal Ball Night Light Ball with Wooden Base(1 piece) Night Lamp',
      price: 242,
    },
    {
      image: container1,
      name: 'Container',
      category: 'Kitchen',
      description: 'Prayati Plastic Fridge Container - 1500 ml',
      price: 239,
    },
    {
      image: carpet,
      name: 'Polypropylene Carpet',
      category: 'Home-Decor',
      description: 'COMFY HOME Green Polypropylene Carpet',
      price: 210,
    },
    {
      image: ballLight,
      name: 'Crystal Ball Night Light',
      category: 'Lighting',
      description:
        'VN Fashion 3D Space Galaxy Planet Crystal Ball Night Light Ball with Wooden Base(1 piece) Night Lamp',
      price: 242,
    },
    {
      image: container1,
      name: 'Container',
      category: 'Kitchen',
      description: 'Prayati Plastic Fridge Container - 1500 ml',
      price: 239,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    ...new Set(staticProducts.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? staticProducts
      : staticProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="home-container">
      <section className="home-categories">
        <h1>Categories</h1>
        <div className="categories-buttons">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <section className="home-products">
        <h2>{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
        <div className="products-list">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              {product.image && (
                <img src={product.image} alt={product.name} className="product-image" />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DisplayProducts;
