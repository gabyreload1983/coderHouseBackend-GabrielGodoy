import ProductManager from "./ProductManager.js";
import { productsTest } from "./productsTest.js";

const path = "./files/products.json";

const main = async () => {
  const productManager = new ProductManager(path);

  console.log(await productManager.getProducts());

  await productManager.addProduct(productsTest[0]);
  await productManager.addProduct(productsTest[1]);
  await productManager.addProduct(productsTest[1]);

  console.log(await productManager.getProducts());

  await productManager.addProduct(productsTest[2]);
  await productManager.addProduct(productsTest[3]);
  await productManager.addProduct(productsTest[4]);

  console.log(await productManager.getProductById(1));
  await productManager.getProductById(10);

  const productUpdate = {
    title: "Update",
    stock: 5555,
    id: 55,
  };
  await productManager.updateProduct(2, productUpdate);
  await productManager.updateProduct(20, productUpdate);
  await productManager.deleteProduct(1);
  await productManager.deleteProduct(10);

  console.log(await productManager.getProducts());
};

main();
