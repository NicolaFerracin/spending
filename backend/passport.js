const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const opts = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: req => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user = await User.findOne({ email: profile._json.email }).exec();
      if (!user) {
        user = await User.create({ email: profile._json.email, name: profile._json.name });
      }
      return cb(null, user);
    }
  )
);

passport.use(
  new JwtStrategy(opts, async (jwt, done) => {
    const user = await User.findById(jwt._id).exec();
    return done(null, !!user ? jwt : false);
  })
);

passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser((obj, cb) => cb(null, obj));
