import { Router } from "express";
import { getStory, createStory, getRandomStory } from "./story.handler";
import { createValidator } from "express-joi-validation";
import { createStoryValidation } from "./story.validation";

const validator = createValidator();
const router = Router();

router.route("/").post(validator.body(createStoryValidation), createStory);
router.route("/random").get(getRandomStory);
router.route("/:uuid").get(getStory);

export default router;
