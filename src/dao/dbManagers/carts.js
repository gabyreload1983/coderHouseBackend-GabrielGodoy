import { cartModel } from "../models/carts.js";

export default class Products {
  constructor() {
    console.log("Working carts with DB in mongoDB");
  }

  createCart = async () => {
    try {
      const result = await cartModel.create({});
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getCart = async (cid) => {
    try {
      const result = await cartModel.findOne({ _id: cid });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cid, cart) => {
    try {
      const result = await cartModel.updateOne({ _id: cid }, cart);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const result = await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
