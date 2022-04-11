import StoryRepository from "./story.repository";
import consola from "consola";

export async function getStory(req, res, next) {
  try {
    const storyRepository = new StoryRepository();
    const { uuid } = req.params;

    const story = await storyRepository.getStory(uuid);
    delete story.id;
    res.json(story);
  } catch (err) {
    consola.error(err);
    next(err);
  }
}

export async function getRandomStory(req, res, next) {
  try {
    const storyRepository = new StoryRepository();
    const story = await storyRepository.getRandomStory();
    delete story.id;
    res.json(story);
  } catch (err) {
    consola.error(err);
    next(err);
  }
}

export async function createStory(req, res, next) {
  try {
    const storyRepository = new StoryRepository();
    const { title, imageUrl } = req.body;
    const story = await storyRepository.createStory({ title, imageUrl });
    story.map((u) => delete u.id);

    res.json(story[0]);
  } catch (err) {
    consola.error(err);
    next(err);
  }
}
