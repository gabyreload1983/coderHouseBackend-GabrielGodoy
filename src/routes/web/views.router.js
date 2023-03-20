import { Router } from "express";
import Products from "../../dao/dbManagers/products.js";
import Carts from "../../dao/dbManagers/carts.js";
import productsPaginateValidator from "../../lib/validators/productsPaginateValidator.js";
import existingProductValidator from "../../lib/validators/existingProductValidator.js";
import idValidator from "../../lib/validators/idValidator.js";
import existingCartValidator from "../../lib/validators/existingCartValidator.js";

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
  try {
    let { limit = 10, page = 1, query = "", sort = "" } = req.query;

    productsPaginateValidator(limit, page, sort);
    if (query) query = JSON.parse(query);
    if (sort) sort = { price: sort };

    const response = await productsManager.getPaginate(
      limit,
      page,
      query,
      sort
    );
    res.render("products", { response });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    idValidator(pid);
    const product = await existingProductValidator(productsManager, pid);
    res.render("productDetail", product);
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    idValidator(cid);
    const cart = await existingCartValidator(cartsManager, cid);

    res.render("cart", cart);
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "error", message: error.message });
  }
});

export default router;
