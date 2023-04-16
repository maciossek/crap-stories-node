import { Router } from "express";
import { signup, login } from "./user.handler";
import { createValidator } from "express-joi-validation";
import { createUserValidation } from "./user.validation";
import passport from "../config/passport";

const validator = createValidator();
const router = Router();

router.route("/signup").post(validator.body(createUserValidation), signup);
router.route("/login").post(
  passport.authenticate("local", {
    session: false,
  }),
  login
);

export default router;
