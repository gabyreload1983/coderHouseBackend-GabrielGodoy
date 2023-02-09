import { Router } from "express";
import fs from "fs";
import path from "path";
import { __dirname, generateId, writeInfo, readInfo } from "../utils.js";
import ProductService from "../services/ProductService.js";

const router = Router();

const cartsPath = path.join(__dirname, "/data/carts.json");
if (!fs.existsSync(cartsPath))
  await fs.promises.writeFile(cartsPath, JSON.stringify([]));

router.post("/", async (req, res) => {
  try {
    const data = await readInfo(cartsPath);
    const carts = JSON.parse(data);
    const cart = { id: generateId(carts), products: [] };
    carts.push(cart);
    await writeInfo(carts, cartsPath);
    res.send({ status: "success", message: "cart created" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const data = await readInfo(cartsPath);
  const carts = JSON.parse(data);
  const cart = carts.find((c) => c.id === Number(cid));
  if (!cart)
    return res
      .status(404)
      .send({ status: "Error", message: "No existe ese id de carrito" });
  res.send({ status: "success", cart: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const data = await readInfo(cartsPath);
    const carts = JSON.parse(data);
    const cart = carts.find((c) => c.id === Number(cid));
    if (!cart)
      return res
        .status(404)
        .send({ status: "Error", message: "No existe ese id de carrito" });

    const productsPath = path.join(__dirname, "/data/products.json");
    if (!fs.existsSync(productsPath))
      await fs.promises.writeFile(productsPath, JSON.stringify([]));
    const productService = new ProductService(productsPath);
    const product = await productService.getProductById(Number(pid));
    if (!product)
      return res
        .status(404)
        .send({ status: "Error", message: "No existe ese id de producto" });

    const newCarts = carts.map((c) => {
      if (c.id === Number(cid)) {
        const index = c.products.findIndex((p) => p.product === Number(pid));
        if (index === -1) {
          c.products.push({ product: Number(pid), quantity: 1 });
          return c;
        }
        c.products[index].quantity++;
      }
      return c;
    });

    await writeInfo(newCarts, cartsPath);

    res.send({ status: "success" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
