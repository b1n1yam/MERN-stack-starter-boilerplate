const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Localstrategy = require("passport-local").Strategy;
const { JWT_SECRET } = require("../config/jwt");
const Usermodel = require("../models/admin");

const config = require("config");
// const clientID = config.get('clientID');
// const clientSecret = config.get('clientSecret');

//JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        //get the user token
        const user = await Usermodel.findById(payload.sub);

        //handle if the user not exists.
        if (!user) {
          return done(null, false);
        }

        //return user
        console.log("user", user);
        done(null, user);
      } catch (error) {
        console.log("error", error);
        done(error, false);
      }
    }
  )
);

//Local Strategy
passport.use(
  new Localstrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        //find the user with this eamil
        const user = await Usermodel.findOne({ email });

        //did't get? handle it
        if (!user) {
          return done(null, false);
        }

        //check the password is correct
        const isMatch = await user.isValidPassword(password);

        //is not match, handle it
        if (!isMatch) {
          return done(null, false);
        }

        //is match, return user.
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
