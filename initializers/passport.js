const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const knex = require('knex');
const knexSessionStore = require('connect-session-knex')(session);

const knexConfig = require('../db/knexfile');
const User = require('../models/User');

const localStrategy = new LocalStrategy((username, password, done) => {
  User.where({ username: username })
    .fetch()
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      return User.validatePassword(password, user.attributes.password)
        .then((res) => {
          if (!res) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        });
    })
    .catch(error => done(error));
});

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
  },
  function(jwtPayload, cb) {
    return User.where({ id: jwtPayload.id })
      .fetch()
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
);

module.exports = {
  name: 'passport',
  after: 'logger',
  configure: (app) => {
    passport.serializeUser((user, done) => {
      return done(null, user);
    });

    passport.deserializeUser(({ id }, done) => {
      return User.where({ id })
        .fetch()
        .then(user => done(null, user))
        .catch(error => done(error));
    });

    passport.use(localStrategy);
    passport.use(jwtStrategy);
    app.use(cookieParser('foo'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
      secret: 'foo',
      resave: true,
      saveUninitialized: false,
      store: new knexSessionStore({
        tablename: 'sessions',
        knex: knex(knexConfig),
      }),
      cookie: {
        path: '/', httpOnly: true, secure: false, maxAge: 15778463
      },
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // User authentication routes

    // Login user

    app.post('/login', passport.authenticate('local'), (req, res) => {
      const token = jwt.sign(req.user.attributes.id, 'your_jwt_secret');

      res.cookie('user_token', token);

      res.json({ user: req.user.attributes });
    });

    // Logout user

    app.get('/logout', (req, res) => {
      req.logout();
      res.clearCookie('user_token');

      res.status(200).send({});
    });
  },
};
