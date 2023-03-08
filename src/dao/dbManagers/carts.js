import { cartModel } from "../models/carts";

export default class Products {
  constructor() {
    console.log("Working carts with DB in mongoDB");
  }

  createCart = async () => {
    try {
      const result = await cartModel.create();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getCart = async (cid) => {
    try {
      const result = await cartModel.find({ _id: cid });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cid, pid) => {
    try {
      const result = await cartModel.updateOne({ _id: cid }, { pid });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
