import { Router } from "express";
import { getStories, getStory, createStory } from "./story.handler";
import { createValidator } from "express-joi-validation";
import { createStoryValidation } from "./story.validation";

const validator = createValidator();
const router = Router();

router.route("/").get(getStories).post(validator.body(createStoryValidation), createStory);
router.route("/:uuid").get(getStory);

export default router;
