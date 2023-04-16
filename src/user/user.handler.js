import UserRepository from "./user.repository";
import consola from "consola";
import jwt from "jsonwebtoken";

export async function signup(req, res, next) {
  try {
    const userRepository = new UserRepository();
    const { email, password } = req.body;

    const user = await userRepository.createUser(email, password);

    const token = jwt.sign({ email: user[0].email }, "jwt_secret", { expiresIn: "2h" });

    res.json({ token: token });
  } catch (err) {
    consola.error(err);
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const token = jwt.sign({ email: req.user.email }, "jwt_secret", { expiresIn: "2h" });
    res.json({ token: token });
  } catch (err) {
    consola.error(err);
    next(err);
  }
}
