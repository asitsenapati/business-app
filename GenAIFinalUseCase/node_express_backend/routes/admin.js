const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/users', (req, res) => {
  res.json(store.users);
});

router.get('/reports', (req, res) => {
  res.json({
    totalUsers: store.users.length,
    totalPets: store.pets.length,
    totalPayments: store.payments.length,
    totalSchedules: store.schedules.length,
    totalFamilyMembers: store.familyMembers.length,
  });
});

module.exports = router;
