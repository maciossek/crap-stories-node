import jwt from "jsonwebtoken";
import env from "../config/env";
import httpStatus from "http-status";
import jwks from "jwks-rsa";
import ApiError from "../exception/ApiError";

export default function authentication() {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
      next(new ApiError("Authorization Header was not sent", httpStatus.FORBIDDEN));
      return;
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
      next();
    } catch (err) {
      next(new ApiError("Token could not be decoded", httpStatus.FORBIDDEN));
    }
  };
}
