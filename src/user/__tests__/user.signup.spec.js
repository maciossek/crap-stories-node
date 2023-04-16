import request from "supertest";
import knex from "../../config/knex";
import jwt from "jsonwebtoken";

describe("User Signup Route", () => {
  beforeAll(async () => {
    await knex("user").del();
  });

  it("/user/signup POST should create a new user", async () => {
    const response = await request(global.app).post("/user/signup").send({ email: "hans@wurst.de", password: "lolwtfhaha" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ token: jwt.sign({ email: "hans@wurst.de" }, "jwt_secret", { expiresIn: "2h" }) });
  });
});
