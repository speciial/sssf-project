"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const UserModel = require("../models/UserModel");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const errorMessage = "Incorrect username or password.";

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({
          Username: { $regex: new RegExp(username, "i") },
        });
        if (user === null) {
          return done(null, false, { message: errorMessage });
        }
        if (!(await bcrypt.compare(password, user.Password))) {
          return done(null, false, { message: errorMessage });
        }
        //delete user.password;
        const strippedUser = user.toObject();
        delete strippedUser.password;
        return done(null, strippedUser, { message: "Logged In Successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT,
    },
    async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload._id, "-password -__v");
        if (user === undefined) {
          return done(null, false, { message: "Incorrect id." });
        }
        return done(null, user, { message: "Logged In Successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
