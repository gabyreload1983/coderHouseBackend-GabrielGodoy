import { Router } from "express";
import Products from "../../dao/dbManagers/products.js";
import Carts from "../../dao/dbManagers/carts.js";

const productsManager = new Products();
const cartsManager = new Carts();

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
  let { limit = 10, page = 1, query = "", sort = "" } = req.query;

  limit = Number(limit);
  page = Number(page);
  if (isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0)
    return res.status(400).send({
      status: "error",
      message: "You must enter a number greater than 0",
    });

  if (query) query = JSON.parse(query);

  if (sort) {
    sort = Number(sort);
    if (isNaN(sort) || (sort !== 1 && sort !== -1))
      return res.status(400).send({
        status: "error",
        message:
          "To sort the result, you must enter the number 1 (DES) or -1 (ASC)",
      });
    sort = { price: sort };
  }
  const response = await productsManager.getPaginate(limit, page, query, sort);
  res.render("products", { response });
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productsManager.getProduct(pid);
  res.render("productDetail", product);
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.getCart(cid);
  res.render("cart", cart);
});

export default router;
