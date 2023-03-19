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

router.get("/products/", async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const response = await productsManager.getPaginate(limit, page);
  res.render("products", { response });
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productsManager.getProduct(pid);
  res.render("productDetail", product);
});

export default router;
