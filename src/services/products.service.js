import { productsManager } from "../dao/index.js";
import { io } from "../app.js";

const getProductsPaginate = async (limit, page, query, sort) => {
  if (query) query = JSON.parse(query);
  if (sort) sort = { price: sort };

  const response = await productsManager.getProductsPaginate(
    limit,
    page,
    query,
    sort
  );

  if (query) query = JSON.stringify(query);

  response.status = "success";
  response.prevLink = response.hasPrevPage
    ? `http://localhost:8080/products?limit=${limit}&page=${response.prevPage}${
        query ? `&query=${query}` : ""
      }${sort ? `&sort=${sort.price}` : ""}`
    : null;
  response.nextLink = response.hasNextPage
    ? `http://localhost:8080/products?limit=${limit}&page=${response.nextPage}${
        query ? `&query=${query}` : ""
      }${sort ? `&sort=${sort.price}` : ""}`
    : null;

  response.payload = response.docs;
  delete response.docs;

  return response;
};

const getAll = async () => await productsManager.getAll();

const getProduct = async (pid) => await productsManager.getProduct(pid);

const addProduct = async (product) => {
  const exists = await productsManager.getProductByCOde(product.code);
  if (exists) return { status: "error", message: "Code already exists" };

  const response = await productsManager.addProduct(product);

  const products = await productsManager.getAll();
  io.emit("realTimeProducts", products);
  return response;
};

const updateProduct = async (pid, product) => {
  const response = await productsManager.updateProduct(pid, product);
  if (response?.modifiedCount === 0)
    return { status: "error", message: "Product id not found" };
  return response;
};

const deleteProduct = async (pid) => {
  const response = await productsManager.deleteProduct(pid);
  if (response?.deletedCount === 0)
    return { status: "error", message: "Product id not found" };

  const products = await productsManager.getAll();
  io.emit("realTimeProducts", products);
  return response;
};

export {
  getProductsPaginate,
  getAll,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
