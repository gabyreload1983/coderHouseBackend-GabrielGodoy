import { cartsManager } from "../dao/index.js";
import CartsRepository from "../repository/carts.repository.js";

const cartRepository = new CartsRepository(cartsManager);

const createCart = async () => await cartRepository.createCart();

const getCart = async (cid) => await cartRepository.getCart(cid);

const addProduct = async (cart, product) => {
  const index = cart.products.findIndex(
    (p) => p.product._id.toString() === product._id.toString()
  );
  if (index === -1) cart.products.push({ product: product._id });
  if (index !== -1) cart.products[index].quantity += 1;

  return await cartRepository.addProduct(cart._id, cart);
};

const updateCart = async (cid, cart) =>
  await cartRepository.updateCart(cid, cart);

const updateQuantity = async (cart, product, quantity) => {
  const index = cart.products.findIndex(
    (p) => p.product._id.toString() === product._id.toString()
  );
  if (index === -1) cart.products.push({ product: product._id, quantity });

  if (index !== -1) cart.products[index].quantity = quantity;

  return await cartRepository.updateCart(cart._id, cart);
};

const deleteProduct = async (cart, product) =>
  await cartRepository.deleteProduct(cart._id, product._id);

const deleteAllProducts = async (cart) =>
  await cartRepository.deleteAllProducts(cart._id);

export {
  createCart,
  getCart,
  addProduct,
  updateCart,
  updateQuantity,
  deleteProduct,
  deleteAllProducts,
};
