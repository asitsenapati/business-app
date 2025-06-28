const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/add', (req, res) => {
  const { userId, name, type, age } = req.body;
  const pet = { id: Date.now(), userId, name, type, age };
  store.pets.push(pet);
  res.json({ message: 'Pet added', pet });
});

router.put('/update/:id', (req, res) => {
  const pet = store.pets.find(p => p.id == req.params.id);
  if (pet) {
    Object.assign(pet, req.body);
    res.json({ message: 'Pet updated', pet });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.delete('/delete/:id', (req, res) => {
  store.pets = store.pets.filter(p => p.id != req.params.id);
  res.json({ message: 'Deleted' });
});

// Get all pets for a user
router.get('/list/:userId', (req, res) => {
  const userId = req.params.userId;
  const pets = store.pets.filter(p => p.userId == userId);
  res.json({ pets });
});

module.exports = router;
