import { messageModel } from "../models/messages.js";

export default class Messages {
  constructor() {
    console.log("Working messages with DB in mongoDB");
  }

  addMessage = async (user, message) => {
    try {
      const result = await messageModel.create({ user, message });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}
