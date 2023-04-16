import "dotenv/config";
import knex from "./src/config/knex";
import passport from "passport";
import UserRepository from "./src/user/user.repository";

beforeAll(() => {
  global.app = require("./src/config/express").default;
});
afterAll(async () => {
  knex.destroy();
});

jest.mock("passport-jwt", () => ({
  ExtractJwt: {
    fromAuthHeaderAsBearerToken: () => "hans",
  },
  Strategy: class Strategy extends passport.Strategy {
    name = "jwt";

    async authenticate() {
      const userRepo = new UserRepository();
      let user;
      try {
        user = await userRepo.getUser("hans@wurst.de");
      } catch (err) {
        const users = userRepo.createUser("hans@wurst.de", "lolwtfhaha");
        user = users[0];
      }
      this.success(user);
    }
  },
}));
