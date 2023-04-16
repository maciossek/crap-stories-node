import { Router } from "express";
import httpStatus from "http-status";
import config from "./config/env";
import storyRoutes from "./story/story.routes";
import userRoutes from "./user/user.routes";
import passport from "./config/passport";

const router = Router();

router.get("/health", (req, res) => res.status(httpStatus.OK).send());

router.get("/version", (req, res) => {
  res.json({
    version: config.version,
    commitHash: config.commitHash,
  });
});

router.use("/user", userRoutes);
router.use(
  "/story",
  passport.authenticate("jwt", {
    session: false,
  }),
  storyRoutes
);

export default router;
