import request from "supertest";
import knex from "../../config/knex";
import { v4 as uuid } from "uuid";
import StoryRepository from "../story.repository";
import UserRepository from "../../user/user.repository";
const storyUuid = uuid();
jest.mock("consola");

describe("Story getStory Route", () => {
  beforeAll(async () => {
    await knex("user").del();
    await knex("story").del();
    const userRepo = new UserRepository();
    const user = await userRepo.createUser("hans@wurst.de", "lolwtfhaha");

    await knex("story").insert({
      uuid: storyUuid,
      title: "a test story",
      imageUrl: "https://picsum.photos/300",
      userId: user[0].id,
    });
  });

  it("/story/:uuid GET should return a specific story", async () => {
    const response = await request(global.app).get(`/story/${storyUuid}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ title: "a test story", imageUrl: "https://picsum.photos/300" });
  });

  it("should return 404 if the story does not exist", async () => {
    const response = await request(global.app).get(`/story/00000000-0000-0000-0000-000000000000`);
    expect(response.body.status).toBe(404);
  });
  it("should throw an error when knex.select fails", async () => {
    const knexSpy = jest.spyOn(StoryRepository.prototype, "getStory").mockImplementation(() => Promise.reject("noooope"));

    const response = await request(global.app).get(`/story/${storyUuid}`);
    expect(response.body.status).toBe(500);
    knexSpy.mockRestore();
  });
});
