import request from "supertest";
import knex from "../../config/knex";

describe("Story Create Route", () => {
  beforeAll(async () => {
    await knex("story").del();
  });

  it("/story POST should create a new story", async () => {
    const response = await request(global.app).post("/story").send({ title: "test", imageUrl: "test url" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ title: "test", imageUrl: "test url" });
  });
});
