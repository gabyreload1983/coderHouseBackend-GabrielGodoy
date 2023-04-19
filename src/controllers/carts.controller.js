import { incompleteValues, isInvalidId } from "../lib/validators/validator.js";
import {
  createCart as createCartService,
  getCart as getCartService,
  addProduct as addProductService,
  updateCart as updateCartService,
  updateQuantity as updateQuantityService,
  deleteProduct as deleteProductService,
  deleteAllProducts as deleteAllProductsService,
} from "../services/carts.service.js";

const createCart = async (req, res) => {
  try {
    const response = await createCartService();

    res.send({ status: "success", message: "Cart created", response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    if (isInvalidId(cid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const cart = await getCartService(cid);
    if (!cart)
      return res
        .status(404)
        .send({ status: "error", message: "Cart id not found" });

    res.send({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (isInvalidId(cid, pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await addProductService(cid, pid);
    if (response?.status === "error")
      return res
        .status(404)
        .send({ status: "error", message: response.message });

    res.send({ status: "success", message: "Product added." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { newCart } = req.body;

    if (isInvalidId(cid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await updateCartService(cid, newCart);

    if (!response)
      return res
        .status(400)
        .send({ status: "error", message: "Cart id not found" });

    res.send({ status: "success", message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (incompleteValues(quantity))
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    if (isInvalidId(cid, pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await updateQuantityService(cid, pid, quantity);
    if (response?.status === "error")
      return res
        .status(404)
        .send({ status: "error", message: response.message });

    res.send({ status: "success", message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (isInvalidId(cid, pid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await deleteProductService(cid, pid);
    if (response?.status === "error")
      return res
        .status(404)
        .send({ status: "error", message: response.message });

    res.send({ status: "success", message: "Product was deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    if (isInvalidId(cid))
      return res.status(400).send({ status: "error", message: "Invalid id" });

    const response = await deleteAllProductsService(cid);
    if (response?.status === "error")
      return res
        .status(404)
        .send({ status: "error", message: response.message });

    res.send({
      status: "success",
      message: `All products was deleted from cart`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export {
  createCart,
  getCart,
  addProduct,
  updateCart,
  updateQuantity,
  deleteProduct,
  deleteAllProducts,
};
