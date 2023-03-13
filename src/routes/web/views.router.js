import { Router } from "express";
import Products from "../../dao/dbManagers/products.js";
import Messages from "../../dao/dbManagers/messages.js";

const productsManager = new Products();
const messagesManager = new Messages();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.render("home", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/chat", async (req, res) => {
  res.render("chat");
});

export default router;
