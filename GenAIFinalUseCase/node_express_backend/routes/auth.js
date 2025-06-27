const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: Date.now(), name, email, password };
  store.users.push(user);
  res.status(201).json({ message: 'User registered', user });
});

module.exports = router;
