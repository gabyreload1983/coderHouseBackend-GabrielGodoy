import { Router } from "express";
import { io } from "../../app.js";
import Products from "../../dao/dbManagers/products.js";
import mongoose from "mongoose";

const productsManager = new Products();

const router = Router();

router.get("/", async (req, res) => {
  try {
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

    const response = await productsManager.getPaginate(
      limit,
      page,
      query,
      sort
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    if (!mongoose.isValidObjectId(pid))
      return res.status(404).send({ status: "error", message: "Invalid id!" });

    const product = await productsManager.getProduct(pid);
    if (product) return res.send({ status: "success", product });
    res
      .status(404)
      .send({ status: "error", Error: "The product does not exist!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const { title, description, code, price, stock, category } = product;
    if (!title || !description || !code || !price || !stock || !category)
      return res
        .status(400)
        .send({ status: "error", message: "You must enter all fields" });

    const response = await productsManager.addProduct(product);
    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Error creating product" });

    const products = await productsManager.getAll();
    io.emit("realTimeProducts", products);

    res.send({ status: "success", message: "Product added", response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    if (!mongoose.isValidObjectId(pid))
      return res.status(404).send({ status: "error", message: "Invalid id!" });

    const product = req.body;

    const response = await productsManager.updateProduct(pid, product);
    return response?.modifiedCount
      ? res.send({ status: "success", message: "Product update" })
      : res.status(404).send({
          status: "error",
          message: "Can not update product",
        });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    if (!mongoose.isValidObjectId(pid))
      return res.status(404).send({ status: "error", message: "Invalid id!" });

    const response = await productsManager.deleteProduct(pid);
    if (response?.deletedCount) {
      const products = await productsManager.getAll();
      io.emit("realTimeProducts", products);
      return res.send({ status: "success", message: "Product delete" });
    }
    res.status(404).send({
      status: "error",
      message: "Error deleting product!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

export default router;
