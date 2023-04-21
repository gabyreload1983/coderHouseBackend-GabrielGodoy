import { incompleteValues } from "../lib/validators/validator.js";
import {
  register as registerService,
  login as loginService,
  githubCallback as githubCallbackService,
} from "../services/users.service.js";

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

    const response = await registerService(
      first_name,
      last_name,
      email,
      age,
      role,
      password
    );

    if (response?.status === "error") return res.status(400).send(response);

    res.send({ status: "success", message: "user registered" });
  } catch (error) {
    console.log(error);
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

    const response = await loginService(email, password);

    if (response?.status === "error") return res.status(400).send(response);

    const accessToken = response;

    res
      .cookie("coderCookieToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .send({ status: "success", message: "login success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("coderCookieToken");
  res.redirect("/login");
};

const githubCallback = async (req, res) => {
  try {
    const accessToken = await githubCallbackService(req.user);

    res
      .cookie("coderCookieToken", accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .redirect("/products");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { register, login, logout, githubCallback };
