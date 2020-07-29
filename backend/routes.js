const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'ok' }));

router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/callback', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign(
    {
      ...req.user
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('jwt', token);
  res.redirect('/');
});

// TODO use failureRedirect for unauthorized requests
const jwtMiddleware = passport.authenticate('jwt', { session: false });

router.get('/private', jwtMiddleware, (req, res) => {
  res.send(`Welcome ${req.user.name}`);
});

module.exports = router;
