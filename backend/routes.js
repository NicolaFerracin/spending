const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Entry = require('./models/Entry');
const Category = require('./models/Category');
const PaymentMethod = require('./models/PaymentMethod');

const jwtMiddleware = passport.authenticate('jwt', { session: false });

router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/callback', passport.authenticate('google'), (req, res) => {
  const { _id, email, name } = req.user;
  const token = jwt.sign({ _id, email, name }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('jwt', token);
  res.redirect(process.env.FRONTEND_URL);
});

router.get('/profile', jwtMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// get all
router.get('/api/entries', jwtMiddleware, async (req, res) => {
  const entries = await Entry.find({ user: req.user })
    .populate('paymentMethod')
    .populate('category');
  res.json({ entries });
});
router.get('/api/categories', jwtMiddleware, async (req, res) => {
  const categories = await Category.find({ user: req.user });
  res.json({ categories });
});
router.get('/api/payment-methods', jwtMiddleware, async (req, res) => {
  const paymentMethods = await PaymentMethod.find({ user: req.user });
  res.json({ paymentMethods });
});

// create
router.post('/api/entries', jwtMiddleware, async (req, res) => {
  const entry = await Entry.create({ ...req.body, user: req.user });
  res.json({ entry });
});
router.post('/api/categories', jwtMiddleware, async (req, res) => {
  const category = await Category.create({ name: req.body.name, user: req.user });
  res.json({ category });
});
router.post('/api/payment-methods', jwtMiddleware, async (req, res) => {
  const paymentMethod = await PaymentMethod.create({ name: req.body.name, user: req.user });
  res.json({ paymentMethod });
});

// update
router.put('/api/entries/:id', jwtMiddleware, async (req, res) => {
  const entry = await Entry.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { ...req.body, user: req.user },
    { new: true }
  );
  res.json({ entry });
});
router.put('/api/categories/:id', jwtMiddleware, async (req, res) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { name: req.body.name, user: req.user },
    { new: true }
  );
  res.json({ category });
});
router.put('/api/payment-methods/:id', jwtMiddleware, async (req, res) => {
  const paymentMethod = await PaymentMethod.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { name: req.body.name, user: req.user },
    { new: true }
  );
  res.json({ paymentMethod });
});

// delete
router.delete('/api/entries/:id', jwtMiddleware, async (req, res) => {
  await Entry.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.sendStatus(200);
});
router.delete('/api/categories/:id', jwtMiddleware, async (req, res) => {
  await Category.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.sendStatus(200);
});
router.delete('/api/payment-methods/:id', jwtMiddleware, async (req, res) => {
  await PaymentMethod.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.sendStatus(200);
});

module.exports = router;
