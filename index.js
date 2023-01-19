import ProductManager from "./ProductManager.js";

const path = "./files/Products.json";

const main = async () => {
  const productManager = new ProductManager(path);
  let products = await productManager.getProducts();
  console.log(products);

  await productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await productManager.addProduct(
    "producto prueba222222222",
    "Este es un producto prueba2222222",
    20022,
    "Sin imagen22222222",
    "abc123222222222",
    2522
  );
  await productManager.addProduct(
    "producto prueba222222222",
    "Este es un producto prueba2222222",
    20022,
    "Sin imagen22222222",
    "abc123222222222",
    2522
  );

  products = await productManager.getProducts();
  console.log(products);

  await productManager.addProduct(
    "",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123"
  );
  await productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    null,
    "Sin imagen",
    "abc123",
    25
  );

  let product = await productManager.getProductById(1);
  console.log(product);

  product = await productManager.getProductById(10);
};

main();
