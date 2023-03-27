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

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};
const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};

router.get("/", publicAccess, async (req, res) => {
  res.redirect("/login");
});

router.get("/realtimeproducts", privateAccess, async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.render("realTimeProducts", { products, user: req.session.user });
  } catch (error) {
    console.log(error);
  }
});

router.get("/chat", privateAccess, async (req, res) => {
  res.render("chat", { user: req.session.user });
});

router.get("/products/", privateAccess, async (req, res) => {
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

    res.render("products", { response, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/products/:pid", privateAccess, async (req, res) => {
  try {
    const { pid } = req.params;
    idValidator(pid);
    const product = await existingProductValidator(productsManager, pid);
    product.user = req.session.user;
    res.render("productDetail", product);
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/carts/:cid", privateAccess, async (req, res) => {
  try {
    const { cid } = req.params;
    idValidator(cid);
    const cart = await existingCartValidator(cartsManager, cid);

    res.render("cart", { ...cart, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: "error", message: error.message });
  }
});

router.get("/register", publicAccess, (req, res) => {
  res.render("register");
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/profile", privateAccess, (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

export default router;
