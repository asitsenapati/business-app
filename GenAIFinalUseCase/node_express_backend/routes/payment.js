const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.post('/pay', (req, res) => {
  const { userId, amount, service } = req.body;
  const payment = { id: Date.now(), userId, amount, service, status: 'Paid' };
  store.payments.push(payment);
  res.json({ message: 'Payment successful', payment });
});

module.exports = router;
