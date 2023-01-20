import ProductManager from "./ProductManager.js";
import { productsTest } from "./productsTest.js";

const path = "./files/products.json";

const main = async () => {
  const productManager = new ProductManager(path);

  let products = await productManager.getProducts();
  console.log(products);

  await productManager.addProduct(productsTest[0]);
  await productManager.addProduct(productsTest[1]);
  await productManager.addProduct(productsTest[1]);

  products = await productManager.getProducts();
  console.log(products);

  await productManager.addProduct(productsTest[2]);
  await productManager.addProduct(productsTest[3]);
  await productManager.addProduct(productsTest[4]);

  let product = await productManager.getProductById(1);
  console.log(product);

  await productManager.getProductById(10);

  const productUpdate = {
    title: "Update",
    stock: 5555,
  };
  await productManager.updateProduct(2, productUpdate);
  await productManager.updateProduct(20, productUpdate);
  await productManager.deleteProduct(1);
  await productManager.deleteProduct(10);

  products = await productManager.getProducts();
  console.log(products);
};

main();
