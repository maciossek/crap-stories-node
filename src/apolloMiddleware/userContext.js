import jwt from "jsonwebtoken";
import env from "../config/env";
import jwks from "jwks-rsa";
import { GraphQLError } from "graphql";

export default async function userContext(req) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.substring(7, req.headers.authorization.length);
  } else {
    throw new GraphQLError("Authorization Header was not sent");
  }

  const jwksClient = jwks({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: env.jwksUri,
  });

  try {
    const decodedToken = jwt.decode(token, { complete: true });
    const signingKey = await jwksClient.getSigningKey(decodedToken.header.kid);

    jwt.verify(token, signingKey.getPublicKey());
    return decodedToken;
  } catch (err) {
    throw new GraphQLError("Token could not be decoded");
  }
}
