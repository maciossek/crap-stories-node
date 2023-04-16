import request from "supertest";
import knex from "../../config/knex";
import UserRepository from "../user.repository";

describe("User Login Route", () => {
  beforeAll(async () => {
    await knex("user").del();

    const userRepo = new UserRepository();
    await userRepo.createUser("hans@wurst.de", "lolwtfhaha");
  });

  it("/user/login POST should return a token", async () => {
    const response = await request(global.app).post("/user/login").send({ email: "hans@wurst.de", password: "lolwtfhaha" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
