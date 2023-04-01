import { Router } from "express";
import userModel from "../../dao/models/users.model.js";
import Carts from "../../dao/dbManagers/carts.js";
import passport from "passport";
import { createHash } from "../../utils.js";

const cartsManager = new Carts();

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "fail-register" }),
  async (req, res) => {
    res.send({ status: "success", message: "user registered" });
  }
);

router.get("/fail-register", async (req, res) => {
  res.send({ status: "error", message: "register failed" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "fail-login" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid credentials" });

    const cart = await cartsManager.createCart();

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      rol: req.user.rol,
      cartId: cart._id.toString(),
    };

    res.send({ status: "success", message: "login success" });
  }
);

router.get("/fail-login", async (req, res) => {
  res.send({ status: "error", message: "login failed" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "error", error: "No se pudo hacer lougout" });

    res.redirect("/login");
  });
});

export default router;
