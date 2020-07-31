const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Entry = require('./models/Entry');

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

router.get('/api/entries', jwtMiddleware, async (req, res) => {
  const entries = await Entry.find({ user: req.user });
  res.json({ entries });
});
router.get('/api/categories', jwtMiddleware);
router.get('/api/methods', jwtMiddleware);

router.get('/api/entries/:id', jwtMiddleware, async (req, res) => {
  const entry = await Entry.findOne({ _id: req.params.id, user: req.user });
  res.json({ entry });
});

router.post('/api/entries', jwtMiddleware, async (req, res) => {
  const entry = await Entry.create({ ...req.body, user: req.user });
  res.json({ entry });
});
router.post('/api/categories', jwtMiddleware);
router.post('/api/methods', jwtMiddleware);

router.put('/api/entries/:id', jwtMiddleware, async (req, res) => {
  const entry = await Entry.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { ...req.body, user: req.user },
    { new: true }
  );
  res.json({ entry });
});
router.put('/api/categories/:id', jwtMiddleware);
router.put('/api/methods/:id', jwtMiddleware);

router.delete('/api/entries/:id', jwtMiddleware, async (req, res) => {
  await Entry.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.sendStatus(200);
});
router.delete('/api/categories/:id', jwtMiddleware);
router.delete('/api/methods/:id', jwtMiddleware);

module.exports = router;
