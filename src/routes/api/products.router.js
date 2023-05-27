import { Router } from "express";
import * as productsController from "../../controllers/products.controller.js";
import { authorization, passportCall } from "../../utils.js";

const router = Router();

router.get("/", productsController.getProductsPaginate);

router.get("/mocking-products", productsController.getMockingProducts);

router.get("/:pid", productsController.getProduct);

router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  productsController.addProduct
);

router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  productsController.updateProduct
);

router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  productsController.deleteProduct
);

export default router;
