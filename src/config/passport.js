import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import UserRepository from "../user/user.repository";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const userRepo = new UserRepository();
    const user = await userRepo.getUser(email);

    if (!user) {
      return done(null, false, { message: "Invalid credentials" });
    }

    const passwordOk = await UserRepository.checkPassword(password, user?.password);

    if (!passwordOk) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, user);
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "jwt_secret",
    },
    async (jwt_payload, done) => {
      const userRepo = new UserRepository();
      const user = await userRepo.getUser(jwt_payload.email);

      // mehr checks

      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }
      return done(null, user);
    }
  )
);

export default passport;
