import { incompleteValues } from "../lib/validators/validator.js";
import logger from "../logger/logger.js";
import * as userService from "../services/users.service.js";
import { generateToken, validatePassword } from "../utils.js";

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      age,
      role = "user",
      password,
    } = req.body;

    if (incompleteValues(first_name, last_name, email, age, password))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const user = await userService.getUserByEmail(email);
    if (user)
      return res
        .status(400)
        .send({ status: "error", message: "User already exists!" });

    await userService.register(
      first_name,
      last_name,
      email,
      age,
      role,
      password
    );

    res.send({ status: "success", message: "user registered" });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (incompleteValues(email, password))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid credentials" });

    if (!validatePassword(user, password))
      return res
        .status(400)
        .send({ status: "error", message: "Invalid credentials" });

    const response = await userService.login(user, password);

    const accessToken = generateToken(response);

    res
      .cookie("coderCookieToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .send({ status: "success", message: "login success" });
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("coderCookieToken");
  res.redirect("/login");
};

const sendEmailResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (incompleteValues(email))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid Email" });

    await userService.sendEmailResetPassword(user);

    res.send({ status: "success", message: "We send you an email" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};

const github = async (req, res) => {
  res.send({ status: "sucess", message: "user registered" });
};

const githubCallback = async (req, res) => {
  try {
    const accessToken = await userService.githubCallback(req.user);

    res
      .cookie("coderCookieToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .redirect("/products");
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
};

const current = async (req, res) => {
  res.send({ user: req.user });
};

export {
  register,
  login,
  logout,
  github,
  githubCallback,
  current,
  sendEmailResetPassword,
};
