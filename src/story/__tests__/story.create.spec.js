import request from "supertest";
import knex from "../../config/knex";
import StoryRepository from "../story.repository";

jest.mock("consola");

describe("Story Create Route", () => {
  beforeAll(async () => {
    await knex("story").del();
  });

  it("/story POST should create a new story", async () => {
    const response = await request(global.app).post("/story").send({ title: "test", imageUrl: "test url" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ title: "test", imageUrl: "test url" });
  });

  it("should throw an error when knex.select fails", async () => {
    const knexSpy = jest.spyOn(StoryRepository.prototype, "createStory").mockImplementation(() => Promise.reject("noooope"));

    const response = await request(global.app).post("/story").send({ title: "test", imageUrl: "test url" });
    expect(response.body.status).toBe(500);
    knexSpy.mockRestore();
  });
});
