import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../../utils.js";
import {
  cart,
  chat,
  home,
  login,
  productsDetail,
  productsPaginate,
  profile,
  realTimeProducts,
  register,
  sendEmailResetPassword,
  resetPassword,
} from "../../controllers/view.controller.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  home
);

router.get(
  "/realtimeproducts",
  passport.authenticate("jwt", { session: false }),
  realTimeProducts
);

router.get("/chat", passportCall("jwt"), authorization("user"), chat);

router.get(
  "/products/",
  passport.authenticate("jwt", { session: false }),
  productsPaginate
);

router.get(
  "/products/:pid",
  passport.authenticate("jwt", { session: false }),
  productsDetail
);

router.get(
  "/carts/:cid",
  passport.authenticate("jwt", { session: false }),
  cart
);

router.get("/register", register);

router.get("/login", login);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

router.get("/send-email-reset-password", sendEmailResetPassword);

router.get("/reset-password", resetPassword);

export default router;
