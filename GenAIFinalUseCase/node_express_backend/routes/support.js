const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/feedback', (req, res) => {
  const { userId, message, rating } = req.body;
  store.feedbacks.push({ id: Date.now(), userId, message, rating });
  res.json({ message: 'Feedback received' });
});

module.exports = router;
