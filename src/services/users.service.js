import moment from "moment";
import { usersManager } from "../dao/index.js";
import { cartsManager } from "../dao/index.js";
import UsersRepository from "../repository/users.repository.js";
import CartsRepository from "../repository/carts.repository.js";
import { isAdmin } from "../lib/validators/validator.js";
import { createHash, generateToken, validatePassword } from "../utils.js";
import { sendEmail } from "./email.service.js";
import config from "../config/config.js";

const cartRepository = new CartsRepository(cartsManager);
const userRepository = new UsersRepository(usersManager);

export const getUserByEmail = async (email) =>
  userRepository.findByEmail(email);

export const register = async (
  first_name,
  last_name,
  email,
  age,
  role,
  password
) => {
  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    role,
  };
  return await userRepository.create(newUser);
};

export const login = async (user, password) => {
  user = await userRepository.login(user);

  if (!user.cart) {
    const cart = await cartRepository.createCart();
    user.cart = cart._id.toString();
    await userRepository.update(user.email, user);
  }

  if (isAdmin(user.email, password)) {
    user.role = "admin";
  }

  return user;
};

export const githubCallback = async (user) => {
  user = await userRepository.login(user);
  if (!user.cart) {
    const cart = await cartRepository.createCart();
    user.cart = cart._id.toString();
    await userRepository.update(user.email, user);
  }

  return generateToken(user);
};

export const sendEmailResetPassword = async (user) => {
  const expirationDate = moment().format();
  user.resetPasswordDate = expirationDate;
  await userRepository.update(user.email, user);

  const html = `
  <h1>Reset password</h1>
    <p>To reset your password, go to the following <a href="http://localhost:8080/reset-password?id=${user._id}">link</a></p>
    <p>This link is valid for 1 hour</p>
  `;

  const dataEmail = {
    to: user.email,
    subject: "Ecommerce - Reset Password",
    html,
  };

  await sendEmail(dataEmail);
};

export const validateUrlExpiration = async (id) => {
  const user = await userRepository.findById(id);
  const now = new moment();
  const expirationDate = moment(user.resetPasswordDate).utc().format();
  const diff = now.diff(expirationDate, "minutes");
  return diff < config.reset_password_minutes;
};

export const resetPassword = async (id, password) => {
  const user = await userRepository.findById(id);
  const samePassword = validatePassword(user, password);
  if (samePassword) return false;
  user.password = createHash(password);
  user.resetPasswordDate = 0;
  return await userRepository.update(user.email, user);
};
