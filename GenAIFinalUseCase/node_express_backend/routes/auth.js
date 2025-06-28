const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: Date.now(), name, email, password };
  store.users.push(user);
  res.status(201).json({ message: 'User registered', user });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({ message: 'User logged in', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
