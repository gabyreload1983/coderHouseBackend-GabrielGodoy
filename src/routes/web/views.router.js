import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../../utils.js";
import * as viewController from "../../controllers/view.controller.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  viewController.home
);

router.get(
  "/realtimeproducts",
  passport.authenticate("jwt", { session: false }),
  viewController.realTimeProducts
);

router.get(
  "/chat",
  passportCall("jwt"),
  authorization("user", "premium"),
  viewController.chat
);

router.get(
  "/products/",
  passport.authenticate("jwt", { session: false }),
  viewController.productsPaginate
);

router.get(
  "/products/:pid",
  passport.authenticate("jwt", { session: false }),
  viewController.productsDetail
);

router.get(
  "/carts/:cid",
  passport.authenticate("jwt", { session: false }),
  viewController.cart
);

router.get("/register", viewController.register);

router.get("/login", viewController.login);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  viewController.profile
);

router.get("/send-email-reset-password", viewController.sendEmailResetPassword);

router.get("/reset-password", viewController.resetPassword);

export default router;
