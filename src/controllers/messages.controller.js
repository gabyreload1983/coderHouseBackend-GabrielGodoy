import * as messagesService from "../services/messages.service.js";

const getMessages = async (req, res) => {
  try {
    const messages = await messagesService.getMessages();

    res.send({ status: "success", messages });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const { mid } = req.params;
    const message = await messagesService.getMessage(mid);
    if (!message)
      return res
        .status(404)
        .send({ status: "error", message: "Message not found" });

    res.send({ status: "success", message });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addMessage = async (req, res) => {
  try {
    const { user, message } = req.body;

    const result = await messagesService.addMessage(user, message);

    res.send({ status: "success", result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { newMessage } = req.body;

    const message = await messagesService.getMessage(id);
    if (!message)
      return res
        .status(404)
        .send({ status: "error", message: "Message not found" });

    const result = await messagesService.updateMessage(id, newMessage);

    res.send({ status: "success", result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await messagesService.getMessage(id);
    if (!message)
      return res
        .status(404)
        .send({ status: "error", message: "Message not found" });

    const result = await messagesService.deleteMessage(id);

    res.send({ status: "success", result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { getMessages, getMessage, addMessage, updateMessage, deleteMessage };
