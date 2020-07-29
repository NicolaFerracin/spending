const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const opts = {};
opts.jwtFromRequest = req => {
  console.log(req.cookies['jwt']);
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
      // TODO create or check user existence
      const user = { email: profile._json.email, name: profile._json.name };
      return cb(null, user);
    }
  )
);

passport.use(
  new JwtStrategy(opts, function(jwt, done) {
    // TODO check user
    // return done(null, false);
    return done(null, jwt);
  })
);

passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser((obj, cb) => cb(null, obj));
