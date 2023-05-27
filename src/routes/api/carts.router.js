import { Router } from "express";
import * as cartsController from "../../controllers/carts.controller.js";
import { authorization, passportCall } from "../../utils.js";

const router = Router();

router.post("/", cartsController.createCart);
router.get("/:cid", cartsController.getCart);
router.post(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  cartsController.addProduct
);
router.put("/:cid", cartsController.updateCart);
router.put("/:cid/product/:pid", cartsController.updateQuantity);
router.delete("/:cid/products/:pid", cartsController.deleteProduct);
router.delete("/:cid/", cartsController.deleteAllProducts);

router.post("/:cid/purchase", passportCall("jwt"), cartsController.purchase);

export default router;
