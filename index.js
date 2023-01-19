class ProductManager {
  constructor() {
    this.products = [];
  }

  generateId = () => {
    if (this.products.length === 0) {
      return 1;
    }
    return this.products[this.products.length - 1].id + 1;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (
      [title, description, price, thumbnail, code, stock].some(
        (element) =>
          element === undefined || element === null || element.length === 0
      )
    ) {
      console.log("Debe ingresar todos los argumentos");
      return;
    }

    if (this.products.find((p) => p.code === code)) {
      console.log("Codigo duplicado!!!");
      return;
    }

    const product = {
      id: this.generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    }
    console.log("Not Found");
  };
}

const p = new ProductManager();
console.log(p.getProducts());

p.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(p.getProducts());

p.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(p.getProductById(1));
p.getProductById(10);
p.addProduct();
p.addProduct("", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
p.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123"
);
p.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  null,
  "Sin imagen",
  "abc123",
  25
);
console.log(p.getProducts());
