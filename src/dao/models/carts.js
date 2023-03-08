import mongoose from "mongoose";

const cartCollections = "carts";

const cartsSchema = new mongoose.Schema({
  product: {
    type: Array,
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollections, cartsSchema);
