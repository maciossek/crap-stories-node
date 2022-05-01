import request from "supertest";
import knex from "../../config/knex";
import { v4 as uuid } from "uuid";
import StoryRepository from "../story.repository";

jest.mock("consola").mock("../../apolloMiddleware/userContext");

const queryData = {
  query: `query Query {
    getRandomStory {
      success
      errors
      story {
        title
        uuid
        imageUrl
        created_at
        updated_at
      }
    }
  }
  `,
};

describe("Story resolver", () => {
  beforeAll(async () => {
    await knex("story").del();

    await knex("story").insert({
      uuid: uuid(),
      title: "a test story",
      imageUrl: "https://picsum.photos/300",
    });
  });

  it("queryRandomStory should return a random story", async () => {
    const response = await request(global.app).post("/graphql").send(queryData);
    expect(response.status).toBe(200);
    expect(response.body.data.getRandomStory.success).toBeTruthy();
    expect(response.body.data.getRandomStory.errors).toHaveLength(0);
    expect(response.body.data.getRandomStory.story).toMatchObject({ title: "a test story", imageUrl: "https://picsum.photos/300" });
  });

  it("should throw an error when knex.select fails", async () => {
    const knexSpy = jest.spyOn(StoryRepository.prototype, "getRandomStory").mockImplementation(() => Promise.reject("noooope"));

    const response = await request(global.app).post("/graphql").send(queryData);

    expect(response.body.data.getRandomStory.errors).toHaveLength(1);
    expect(response.body.data.getRandomStory.errors[0]).toBe("noooope");
    expect(response.status).toBe(200);
    knexSpy.mockRestore();
  });
});
