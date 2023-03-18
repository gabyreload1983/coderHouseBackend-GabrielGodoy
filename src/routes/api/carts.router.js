import { Router } from "express";
import mongoose from "mongoose";
import Carts from "../../dao/dbManagers/carts.js";
import Products from "../../dao/dbManagers/products.js";

const cartsManager = new Carts();
const productsManager = new Products();

const router = Router();

router.post("/", async (req, res) => {
  try {
    const response = await cartsManager.createCart();
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error creating cart" });

    res.send({ status: "success", message: "Cart created", response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    if (!mongoose.isValidObjectId(cid))
      return res
        .status(404)
        .send({ status: "error", message: "Invalid cart id!" });

    const cart = await cartsManager.getCart(cid);
    if (!cart)
      return res
        .status(404)
        .send({ status: "error", message: "That cart id does not exist" });
    res.send({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (!mongoose.isValidObjectId(cid))
      return res
        .status(404)
        .send({ status: "error", message: "Invalid cart id!" });

    if (!mongoose.isValidObjectId(pid))
      return res
        .status(404)
        .send({ status: "error", message: "Invalid product id!" });

    const cart = await cartsManager.getCart(cid);
    if (!cart)
      return res
        .status(404)
        .send({ status: "error", message: "That cart id does not exist" });

    const product = await productsManager.getProduct(pid);
    if (!product)
      return res
        .status(404)
        .send({ status: "error", message: "That product id does not exist" });

    console.log(cart);
    console.log(pid);
    const index = cart.products.findIndex((p) => p.product == pid);
    if (index === -1) cart.products.push({ product: pid });
    if (index !== -1) cart.products[index].quantity += 1;

    const response = await cartsManager.addProduct(cid, cart);

    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error adding product" });

    res.send({ status: "success", message: "Product added." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (!mongoose.isValidObjectId(cid))
      return res
        .status(404)
        .send({ status: "error", message: "Invalid cart id!" });

    if (!mongoose.isValidObjectId(pid))
      return res
        .status(404)
        .send({ status: "error", message: "Invalid product id!" });

    const cart = await cartsManager.getCart(cid);
    if (!cart)
      return res
        .status(404)
        .send({ status: "error", message: "That cart id does not exist" });

    const product = await productsManager.getProduct(pid);
    if (!product)
      return res
        .status(404)
        .send({ status: "error", message: "That product id does not exist" });

    const response = await cartsManager.deleteProduct(cid, pid);
    res.send({
      status: "success",
      message: `Delete ${response.modifiedCount} product`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

export default router;
