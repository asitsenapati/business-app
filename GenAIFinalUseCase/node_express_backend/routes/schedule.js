const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/add', (req, res) => {
  const { userId, type, memberId, pickup, dropoff } = req.body;
  const schedule = { id: Date.now(), userId, type, memberId, pickup, dropoff };
  store.schedules.push(schedule);
  res.json({ message: 'Schedule added', schedule });
});

// Get all schedules for a user
router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  const schedules = store.schedules.filter(s => s.userId == userId);
  res.json({ schedules });
});

module.exports = router;
