const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/add', (req, res) => {
  const { userId, type, memberId, dateTime } = req.body;
  const schedule = { id: Date.now(), userId, type, memberId, dateTime };
  store.schedules.push(schedule);
  res.json({ message: 'Schedule added', schedule });
});

module.exports = router;
