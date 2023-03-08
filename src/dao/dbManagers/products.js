import { productModel } from "../models/products";

export default class Products {
  constructor() {
    console.log("Working products with DB in mongoDB");
  }

  getAll = async () => {
    try {
      const products = await productModel.find();
      return products.map((product) => product.toObject());
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      const result = await productModel.create(product);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getProduct = async (pid) => {
    try {
      const result = await productModel.find({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (pid, product) => {
    try {
      const result = await productModel.updateOne({ _id: pid }, product);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
