import { incompleteValues, isInvalidId } from "../lib/validators/validator.js";
import {
  deleteProduct as deleteProductService,
  updateProduct as updateProductService,
  addProduct as addProductService,
  getProduct as getProductService,
  getProductsPaginate as getProductsPaginateService,
} from "../services/products.service.js";

const getProductsPaginate = async (req, res) => {
  try {
    let { limit = 10, page = 1, query = "", sort = "" } = req.query;

    const response = await getProductsPaginateService(limit, page, query, sort);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (isInvalidId(pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const product = await getProductService(pid);
    if (!product)
      return res
        .status(404)
        .send({ status: "error", message: "Product not found" });

    res.send({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const { title, description, code, price, stock, category } = product;
    if (incompleteValues(title, description, code, price, stock, category))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    const response = await addProductService(product);
    if (response?.status === "error") return res.status(404).send(response);

    res.send({ status: "success", message: "Product added" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const newProduct = req.body;
    if (isInvalidId(pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await updateProductService(pid, newProduct);
    if (response?.status === "error") return res.status(404).send(response);

    res.send({ status: "success", message: "Product update" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (isInvalidId(pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await deleteProductService(pid);
    if (response?.status === "error") return res.status(404).send(response);

    res.send({ status: "success", message: "Product delete" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export {
  getProductsPaginate,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
