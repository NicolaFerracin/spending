require('dotenv').config();
const express = require('express');
const passport = require('passport');
const routes = require('./routes');

const app = express();

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);

app.use('/', routes);

app.listen(process.env.PORT || 8080, () =>
  console.log(`App running at http://localhost:${process.env.PORT}`)
);
