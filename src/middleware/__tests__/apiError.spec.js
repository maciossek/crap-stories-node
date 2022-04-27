import request from "supertest";
import ApiErrorMiddleware from "../apiError";

let app;

jest.mock("consola");

describe("ApiError Middleware", () => {
  beforeAll(() => {
    app = require("../../config/express").default;
    app.get("/test-route", () => {
      throw new Error("🔥");
    });

    app.use(ApiErrorMiddleware);
  });

  it("should run", async () => {
    const response = await request(app).get("/test-route");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("🔥");
  });
});
