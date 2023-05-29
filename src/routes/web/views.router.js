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
  authorization("admin", "premium"),
  viewController.realTimeProducts
);

router.get(
  "/chat",
  passport.authenticate("jwt", { session: false }),
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
  authorization("user", "premium"),
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

router.get(
  "/update-role",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  viewController.updateRole
);

export default router;
