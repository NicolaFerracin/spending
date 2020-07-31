require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes');
require('./db');
require('./passport');

const app = express();

app.use(require('cookie-parser')());
app.use(express.json());
app.use(
  require('express-session')({ secret: process.env.SECRET, resave: true, saveUninitialized: true })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(process.env.PORT || 8080, () =>
  console.log(`App running at http://localhost:${process.env.PORT}`)
);
