import Carts from "../dao/dbManagers/carts.js";
import Users from "../dao/dbManagers/users.js";
import { isAdmin } from "../lib/validators/validator.js";
import { createHash, generateToken, validatePassword } from "../utils.js";

const cartsManager = new Carts();
const userManager = new Users();

const getUserByEmail = async (email) => userManager.findByEmail(email);

const register = async (first_name, last_name, email, age, role, password) => {
  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    role,
  };

  return await userManager.create(newUser);
};

const login = async (email, password) => {
  const user = await userManager.findByEmail(email);

  if (!user) return { status: "error", message: "Invalid credentials" };

  if (!validatePassword(user, password))
    return { status: "error", message: "Invalid credentials" };

  if (!user.cart) {
    const cart = await cartsManager.createCart();
    user.cart = cart._id.toString();
    await userManager.update(email, user);
  }

  if (isAdmin(email, password)) {
    user.role = "admin";
  }

  user.password = "";

  return generateToken(user);
};

const githubCallback = async (user) => {
  if (!user.cart) {
    const cart = await cartsManager.createCart();
    user.cart = cart._id.toString();
    await userManager.update(user.email, user);
  }

  return generateToken(user);
};

export { getUserByEmail, register, login, githubCallback };
