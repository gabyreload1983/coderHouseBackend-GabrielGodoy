import mongoose from "mongoose";

const cartCollections = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollections, cartsSchema);
