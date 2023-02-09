import { Router } from "express";
import fs from "fs";
import path from "path";
import ProductService from "../services/ProductService.js";
import { __dirname } from "../utils.js";

const router = Router();

const productsPath = path.join(__dirname, "/data/products.json");
if (!fs.existsSync(productsPath))
  await fs.promises.writeFile(productsPath, JSON.stringify([]));
const productService = new ProductService(productsPath);

router.get("/", async (req, res) => {
  try {
    let { limit } = req.query;
    limit = Number(limit);

    const products = await productService.getProducts();

    if (limit > 0) return res.send(products.slice(0, limit));

    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productService.getProductById(Number(pid));

    if (product) return res.send(product);

    res.status(404).send({ Error: "El producto no existe!!!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const response = await productService.addProduct(product);
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

    const response = await productService.updateProduct(Number(pid), product);
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

    const response = await productService.deleteProduct(Number(pid));
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
