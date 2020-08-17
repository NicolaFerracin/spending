export default function Amount({ value, currency = 'EUR' }) {
  const options = {};
  if (currency) {
    options.style = 'currency';
    options.currency = currency;
  }
  return new Intl.NumberFormat(navigator.language || 'en-US', options).format(value);
}
