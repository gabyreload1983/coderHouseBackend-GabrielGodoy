import express from "express";
import ProductManager from "./ProductManager.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filePath = path.join(dirname, "../files/products.json");
const exist = fs.existsSync(filePath);
if (!exist) await fs.promises.writeFile(filePath, JSON.stringify([]));

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager(filePath);

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await productManager.getProducts();

    if (limit) return res.send(products.slice(0, Number(limit)));

    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(Number(pid));

    if (product) return res.send(product);

    res.send({ Error: "El producto no existe!!!" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => console.log("Listening on port 8080"));
