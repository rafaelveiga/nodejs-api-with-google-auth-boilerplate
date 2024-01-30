import dotenv from "dotenv";

dotenv.config();

// 3rd party
import express, { Application, Request, Response } from "express";
import passport, { DoneCallback } from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import session from "express-session";

// relative
import authRouter from "./modules/auth/router";
import userController from "./modules/user/controller";

const app: Application = express();
const port = process.env.PORT || 3000;

// Express Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: false,
  })
);

// Passport
// ====================================
passport.use(
  new GoogleStrategy(
    // @ts-ignore
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    // @ts-ignore
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: DoneCallback
    ) => {
      const foundUser = await userController.findOrCreate(profile);
      cb(null, foundUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

// Endpoints
// ====================================
app.use("/auth", authRouter);

// Start
// ====================================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
