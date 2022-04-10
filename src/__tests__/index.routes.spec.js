import request from "supertest";

describe("Index Route", () => {
  it("/health should return 200", async () => {
    await expect(request(global.app).get("/health")).resolves.toHaveProperty("status", 200);
  });

  it("/version should return a json based on ENV files", async () => {
    const response = await request(global.app).get("/version");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("version");
    expect(response.body).toHaveProperty("commitHash");
  });
});
