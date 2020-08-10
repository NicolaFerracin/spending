const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const Entry = require('./models/Entry');
const Category = require('./models/Category');
const PaymentMethod = require('./models/PaymentMethod');

const jwtMiddleware = passport.authenticate('jwt', { session: false });

const catchErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(() => {
    next('Uh Oh! Something went wrong.');
  });

router.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/callback', passport.authenticate('google'), (req, res) => {
  const { _id, email, name } = req.user;
  const token = jwt.sign({ _id, email, name }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('jwt', token);
  res.redirect(`${process.env.FRONTEND_URL}/login/callback/${token}`);
});

router.get('/profile', jwtMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// get all
router.get(
  '/api/entries',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const entries = await Entry.find({ user: req.user })
      .sort({ date: 'desc' })
      .populate('paymentMethod')
      .populate('category');
    res.json({ entries });
  })
);
router.get(
  '/api/categories',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const categories = await Category.find({ user: req.user }).sort({ name: 'asc' });
    res.json({ categories });
  })
);
router.get(
  '/api/payment-methods',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const paymentMethods = await PaymentMethod.find({ user: req.user }).sort({ name: 'asc' });
    res.json({ paymentMethods });
  })
);

// get for year and month
router.get(
  '/api/entries/:year/:month',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const { year, month } = req.params;
    const entries = await Entry.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user._id) } },
      { $match: { year: Number(year), month: Number(month) } }
    ]).sort({ date: 'desc' });
    const populatedEntries = await Entry.populate(entries, [
      { path: 'paymentMethod' },
      { path: 'category' }
    ]);
    res.json({ entries: populatedEntries });
  })
);

// get single
router.get(
  '/api/entries/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const [entry] = await Entry.find({ _id: req.params.id, user: req.user })
      .populate('paymentMethod')
      .populate('category');
    res.json({ entry });
  })
);
router.get(
  '/api/categories/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const [category] = await Category.find({ _id: req.params.id, user: req.user });
    res.json({ category });
  })
);
router.get(
  '/api/payment-methods/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const [paymentMethod] = await PaymentMethod.find({ _id: req.params.id, user: req.user });
    res.json({ paymentMethod });
  })
);

// create
router.post(
  '/api/entries',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const [year, month, day] = req.body.date.split('-');
    const newEntry = {
      ...req.body,
      year,
      month,
      day
    };
    const entry = await Entry.create({ ...newEntry, user: req.user });
    res.json({ entry });
  })
);
router.post(
  '/api/categories',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const category = await Category.create({ name: req.body.name, user: req.user });
    res.json({ category });
  })
);
router.post(
  '/api/payment-methods',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const paymentMethod = await PaymentMethod.create({ name: req.body.name, user: req.user });
    res.json({ paymentMethod });
  })
);

// update
router.put(
  '/api/entries/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const [year, month, day] = req.body.date.split('-');
    const updatedEntry = {
      ...req.body,
      year,
      month,
      day
    };
    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { ...updatedEntry, user: req.user },
      { new: true }
    );
    res.json({ entry });
  })
);
router.put(
  '/api/categories/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name: req.body.name, user: req.user },
      { new: true }
    );
    res.json({ category });
  })
);
router.put(
  '/api/payment-methods/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const paymentMethod = await PaymentMethod.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name: req.body.name, user: req.user },
      { new: true }
    );
    res.json({ paymentMethod });
  })
);

// delete
router.delete(
  '/api/entries/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    await Entry.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.sendStatus(200);
  })
);
router.delete(
  '/api/categories/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    await Category.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.sendStatus(200);
  })
);
router.delete(
  '/api/payment-methods/:id',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    await PaymentMethod.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.sendStatus(200);
  })
);

router.get(
  '/api/menu',
  jwtMiddleware,
  catchErrors(async (req, res) => {
    const menu = await Entry.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user._id) } },
      { $group: { _id: '$date' } },
      {
        $project: {
          year: { $dateToString: { format: '%Y', date: '$_id' } },
          month: { $dateToString: { format: '%m', date: '$_id' } }
        }
      },
      {
        $group: {
          _id: { year: '$year', month: '$month' }
        }
      },
      {
        $group: {
          _id: '$_id.year',
          months: {
            $push: {
              month: '$_id.month'
            }
          }
        }
      }
    ]).sort({ _id: 'desc' });
    res.json({ menu });
  })
);

module.exports = router;
