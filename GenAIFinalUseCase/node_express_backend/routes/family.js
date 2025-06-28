const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/add', (req, res) => {
  const { userId, name, age, relation } = req.body;
  const member = { id: Date.now(), userId, name, age,relation };
  store.familyMembers.push(member);
  res.json({ message: 'Family member added', member });
});

router.put('/update/:id', (req, res) => {
  const member = store.familyMembers.find(f => f.id == req.params.id);
  if (member) {
    Object.assign(member, req.body);
    res.json({ message: 'Family member updated', member });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.delete('/delete/:id', (req, res) => {
  store.familyMembers = store.familyMembers.filter(f => f.id != req.params.id);
  res.json({ message: 'Deleted' });
});

// Get all family members for a user
router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  const members = store.familyMembers.filter(f => f.userId == userId);
  res.json({ members });
});

module.exports = router;
