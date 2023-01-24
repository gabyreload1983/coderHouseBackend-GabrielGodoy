import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  generateId = async () => {
    const products = await this.getProducts();
    return products.length === 0 ? 1 : products[products.length - 1].id + 1;
  };

  validateId = async (id) => {
    const products = await this.getProducts();
    return products.some((p) => p.id === id);
  };

  addProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  }) => {
    try {
      if (
        [title, description, price, thumbnail, code, stock].some(
          (element) =>
            element === undefined || element === null || element.length === 0
        )
      ) {
        throw new Error("Debe ingresar todos los argumentos");
      }

      const products = await this.getProducts();

      if (products.find((p) => p.code === code)) {
        throw new Error("Codigo duplicado!!!");
      }

      const product = {
        id: await this.generateId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } catch (error) {
      console.log(`Error al agregar producto: ${error}`);
    }
  };

  getProducts = async () => {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = await JSON.parse(data);
      return products;
    } catch (error) {
      console.log(`Error al obtener productos: ${error}`);
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === id);

      if (product) return product;
      throw new Error(`No existe un producto con el id ${id}`);
    } catch (error) {
      console.log(`Error al obtener producto: ${error}`);
    }
  };

  updateProduct = async (id, product) => {
    try {
      if (!(await this.validateId(id)))
        throw new Error(`No existe un producto con el id ${id}`);

      if (Object.keys(product).some((k) => k === "id")) delete product.id;

      const products = await this.getProducts();

      const updateProducts = products.map((p) => {
        return p.id === id ? { ...p, ...product } : p;
      });
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(updateProducts, null, "\t")
      );
    } catch (error) {
      console.log(`Error al actualizar producto: ${error}`);
    }
  };

  deleteProduct = async (id) => {
    try {
      if (!(await this.validateId(id)))
        throw new Error(`No existe un producto con el id ${id}`);

      const products = await this.getProducts();

      const filterProducts = products.filter((p) => p.id !== id);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(filterProducts, null, "\t")
      );
    } catch (error) {
      console.log(`Error al borrar producto: ${error}`);
    }
  };
}
