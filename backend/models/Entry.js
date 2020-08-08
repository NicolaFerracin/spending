const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  name: String,
  amount: Number,
  paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  day: Number,
  month: Number,
  year: Number
});

module.exports = mongoose.model('Entry', EntrySchema);
