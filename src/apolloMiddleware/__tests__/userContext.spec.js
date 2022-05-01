import userContext from "../userContext";
import jwt from "jsonwebtoken";
import jwks from "jwks-rsa";
import { GraphQLError } from "graphql";

jest.mock("jwks-rsa");

describe("userContext middleware", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should run without errors", async () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    jwks.mockReturnValue({ getSigningKey: () => ({ getPublicKey: () => "pubKey" }) });
    jest.spyOn(jwt, "verify").mockImplementation(() => jest.fn());
    jest.spyOn(jwt, "decode").mockImplementation(() => ({
      header: {
        kid: "kid",
      },
      payload: {
        exp,
        token_use: "access",
      },
    }));

    const nextSpy = jest.fn();

    const result = await userContext({ headers: { authorization: "Bearer yas" } }, {}, nextSpy);

    expect(result).toMatchObject({ header: { kid: "kid" }, payload: { exp, token_use: "access" } });
  });

  it("should throw error when no authorization header is set", async () => {
    await expect(userContext({ headers: { something: "else" } })).rejects.toEqual(new GraphQLError("Authorization Header was not sent"));
  });

  it("should throw error when token cannot be decoded", async () => {
    await expect(userContext({ headers: { authorization: "Bearer yas" } })).rejects.toEqual(new GraphQLError("Token could not be decoded"));
  });
});
