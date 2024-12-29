const express = require('express');
const Category = require('./models/Category');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, image } = req.body;

  try {
    const newCategory = new Category({
      name,
      image,
    });

    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
