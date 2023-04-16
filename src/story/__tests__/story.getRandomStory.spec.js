import request from "supertest";
import knex from "../../config/knex";
import { v4 as uuid } from "uuid";
import StoryRepository from "../story.repository";
import UserRepository from "../../user/user.repository";

describe("Story getRandomStory Route", () => {
  beforeAll(async () => {
    await knex("user").del();
    await knex("story").del();
    const userRepo = new UserRepository();
    const user = await userRepo.createUser("hans@wurst.de", "lolwtfhaha");

    await knex("story").insert({
      uuid: uuid(),
      title: "a test story",
      imageUrl: "https://picsum.photos/300",
      userId: user[0].id,
    });
  });

  it("/story/random GET should return a random story", async () => {
    const response = await request(global.app)
      .get("/story/random")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbnNAY3JhcHN0b3JpZXMud2F0IiwiaWF0IjoxNjgxNjQ5MzU3LCJleHAiOjE2ODE2NTY1NTd9.uTgCM01ZOg6mIWc_XrdukQmBMdrdKS29DRVRp0ckhG0"
      );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ title: "a test story", imageUrl: "https://picsum.photos/300" });
  });

  it("should throw an error when knex.select fails", async () => {
    const knexSpy = jest.spyOn(StoryRepository.prototype, "getRandomStory").mockImplementation(() => Promise.reject("noooope"));

    const response = await request(global.app).get("/story/random");
    expect(response.status).toBe(500);
    knexSpy.mockRestore();
  });
});
