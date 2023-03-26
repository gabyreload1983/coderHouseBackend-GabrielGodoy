import mongoose from "mongoose";

const userCollection = "users";

const usersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  rol: String,
});

const userModel = mongoose.model(userCollection, usersSchema);

export default userModel;
