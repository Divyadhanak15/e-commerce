const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simulating login logic
  if (username === 'admin' && password === 'admin123') {
    return res.json({ success: true, role: 'admin' });
  } else if (username === 'user' && password === 'user123') {
    return res.json({ success: true, role: 'user' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
