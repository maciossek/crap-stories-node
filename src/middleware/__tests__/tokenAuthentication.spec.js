import tokenAuthentication from "../tokenAuthentication";
import jwt from "jsonwebtoken";
import jwks from "jwks-rsa";

jest.mock("jwks-rsa");

describe("authentication middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should run without errors", async () => {
    jwks.mockReturnValue({ getSigningKey: () => ({ getPublicKey: () => "pubKey" }) });
    jest.spyOn(jwt, "verify").mockImplementation(() => jest.fn());
    jest.spyOn(jwt, "decode").mockImplementation(() => ({
      header: {
        kid: "kid",
      },
      payload: {
        exp: Math.floor(Date.now() / 1000) + 3600,

        token_use: "access",
      },
    }));

    const nextSpy = jest.fn();
    const mw = tokenAuthentication();

    await mw({ headers: { authorization: "Bearer yas" } }, {}, nextSpy);

    expect(nextSpy).toHaveBeenCalledWith();
  });

  it("should throw error when no authorization header is set", async () => {
    const nextSpy = jest.fn();
    const mw = tokenAuthentication();

    mw({ headers: { something: "else" } }, {}, nextSpy);
    expect(nextSpy).toHaveBeenCalledWith(new Error("Authorization Header was not sent"));
  });

  it("should throw error when token cannot be decoded", () => {
    const nextSpy = jest.fn();
    const mw = tokenAuthentication();

    mw({ headers: { authorization: "Bearer yas" } }, {}, nextSpy);
    expect(nextSpy).toHaveBeenCalledWith(new Error("Token could not be decoded"));
  });
});
