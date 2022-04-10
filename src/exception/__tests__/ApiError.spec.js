import ApiError from "../ApiError";

describe("ApiError", () => {
  it("should default with an internal server error ", () => {
    const error = new ApiError("test");
    expect(error.message).toBe("test");
    expect(error.status).toBe(500);
  });
});
