const express = require('express');
const router = express.Router();

const orders = [];

router.post('/api/orders', (req, res) => {
  const { productId, quantity, userId } = req.body;

  if (!productId || !quantity || !userId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const newOrder = {
    id: orders.length + 1,
    productId,
    quantity,
    userId,
    status: 'Pending',
    createdAt: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json({ message: 'Order created successfully.', order: newOrder });
});

module.exports = router;
