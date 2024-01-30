import { Router } from "express";
import passport from "passport";
import controller from "./controller";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  controller.login
);

export default router;
