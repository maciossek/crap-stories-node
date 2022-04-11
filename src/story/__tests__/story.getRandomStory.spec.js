import request from "supertest";
import knex from "../../config/knex";
import { v4 as uuid } from "uuid";
import StoryRepository from "../story.repository";

jest.mock("consola");

describe("Story getRandomStory Route", () => {
  beforeAll(async () => {
    await knex("story").del();

    await knex("story").insert({
      uuid: uuid(),
      title: "a test story",
      imageUrl: "https://picsum.photos/300",
    });
  });

  it("/story/random GET should return a random story", async () => {
    const response = await request(global.app).get("/story/random");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ title: "a test story", imageUrl: "https://picsum.photos/300" });
  });

  it("should throw an error when knex.select fails", async () => {
    const knexSpy = jest.spyOn(StoryRepository.prototype, "getRandomStory").mockImplementation(() => Promise.reject("noooope"));

    const response = await request(global.app).get("/story/random");
    expect(response.body.status).toBe(500);
    knexSpy.mockRestore();
  });
});
