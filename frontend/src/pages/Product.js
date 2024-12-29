import React, { useState } from "react";
import './Product.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleAddProduct = () => {
    setProducts([...products, { name: productName, price: productPrice, category: productCategory }]);
    setProductName("");
    setProductPrice("");
    setProductCategory("");
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="products-container">
      <h2>Manage Products</h2>
      <div className="product-input">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="text"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          placeholder="Category"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="product-list">
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ₹{product.price}  - {product.category}
              <button onClick={() => handleDeleteProduct(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
