import { cartsManager, productsManager } from "../dao/index.js";

const createCart = async () => await cartsManager.createCart();

const getCart = async (cid) => await cartsManager.getCart(cid);

const addProduct = async (cid, pid) => {
  const cart = await cartsManager.getCart(cid);
  if (!cart) return { status: "error", message: "Cart id not found" };
  const product = await productsManager.getProduct(pid);
  if (!product) return { status: "error", message: "Product id not found" };

  const index = cart.products.findIndex(
    (p) => p.product._id.toString() === pid
  );
  if (index === -1) cart.products.push({ product: pid });
  if (index !== -1) cart.products[index].quantity += 1;

  await cartsManager.addProduct(cid, cart);
};

const updateCart = async (cid, cart) => {
  const exists = await cartsManager.getCart({ _id: cid });
  if (!exists) return null;

  return await cartsManager.update(cid, cart);
};

const updateQuantity = async (cid, pid, quantity) => {
  const cart = await cartsManager.getCart(cid);
  if (!cart) return { status: "error", message: "Cart id not found" };
  const product = await productsManager.getProduct(pid);
  if (!product) return { status: "error", message: "Product id not found" };

  const index = cart.products.findIndex(
    (p) => p.product._id.toString() === pid
  );
  if (index === -1)
    return { status: "error", message: "Cart not containd that product" };
  if (index !== -1) cart.products[index].quantity = quantity;

  return await cartsManager.update(cid, cart);
};

const deleteProduct = async (cid, pid) => {
  const cart = await cartsManager.getCart(cid);
  if (!cart) return { status: "error", message: "Cart id not found" };
  const product = await productsManager.getProduct(pid);
  if (!product) return { status: "error", message: "Product id not found" };

  const index = cart.products.findIndex(
    (p) => p.product._id.toString() === pid
  );
  if (index === -1)
    return { status: "error", message: "Cart not containd that product" };

  return await cartsManager.deleteProduct(cid, pid);
};

const deleteAllProducts = async (cid) => {
  const cart = await cartsManager.getCart(cid);
  if (!cart) return { status: "error", message: "Cart id not found" };

  return await cartsManager.deleteAllProducts(cid);
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
