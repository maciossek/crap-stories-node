import request from "supertest";
import knex from "../../config/knex";
import StoryRepository from "../story.repository";

jest.mock("consola").mock("../../apolloMiddleware/userContext");

const queryData = {
  query: `mutation Mutation($input: CreateStoryInput!) {
    createStory(input: $input) {
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
  variables: {
    input: {
      title: "test",
      imageUrl: "testUrl",
    },
  },
};

describe("Story resolver", () => {
  beforeAll(async () => {
    await knex("story").del();
  });

  it("queryRandomStory should return a random story", async () => {
    const response = await request(global.app).post("/graphql").send(queryData);
    expect(response.status).toBe(200);

    expect(response.body.data.createStory.success).toBeTruthy();
    expect(response.body.data.createStory.errors).toHaveLength(0);
    expect(response.body.data.createStory.story).toMatchObject({ title: "test", imageUrl: "testUrl" });
  });

  it("should throw an error when knex.select fails", async () => {
    const knexSpy = jest.spyOn(StoryRepository.prototype, "createStory").mockImplementation(() => Promise.reject("noooope"));

    const response = await request(global.app).post("/graphql").send(queryData);

    expect(response.body.data.createStory.errors).toHaveLength(1);
    expect(response.body.data.createStory.errors[0]).toBe("noooope");
    expect(response.status).toBe(200);
    knexSpy.mockRestore();
  });
});
