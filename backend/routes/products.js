const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      category,
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
