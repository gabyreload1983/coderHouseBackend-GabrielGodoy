import mongoose from "mongoose";

const idValidator = (id) => {
  if (!mongoose.isValidObjectId(id)) throw new Error("Invalid id!");
  return true;
};

export default idValidator;
