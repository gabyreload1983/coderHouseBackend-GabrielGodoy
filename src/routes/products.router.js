import { Router } from "express";
import fs from "fs";
import path from "path";
import ProductManager from "../ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router();

const productsPath = path.join(__dirname, "../files/products.json");
if (!fs.existsSync(productsPath))
  await fs.promises.writeFile(productsPath, JSON.stringify([]));
const productManager = new ProductManager(productsPath);

router.get("/", async (req, res) => {
  try {
    let { limit } = req.query;
    limit = Number(limit);

    const products = await productManager.getProducts();

    if (limit > 0) return res.send(products.slice(0, limit));

    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(Number(pid));

    if (product) return res.send(product);

    res.status(404).send({ Error: "El producto no existe!!!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const response = await productManager.addProduct(product);
    if (response.error)
      return res.status(400).send({ error: response.error.message });

    res.send({ message: "Product added" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;

    const response = await productManager.updateProduct(Number(pid), product);
    return response.status === "success"
      ? res.send({ status: "success", message: "Product update" })
      : res.status(404).send({
          error: "Error al actualizar producto",
          message: response.error,
        });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const response = await productManager.deleteProduct(Number(pid));
    return response.status === "success"
      ? res.send({ status: "success", message: "Product delete" })
      : res.status(404).send({
          error: "Error al borrar producto",
          message: response.error,
        });
  } catch (error) {
    console.log(error);
  }
});

export default router;
