import { Router } from "express";
import {
  addMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage,
} from "../../controllers/messages.controller.js";

const router = Router();

router.get("/", getMessages);

router.get("/:mid", getMessage);

router.post("/", addMessage);

router.put("/:mid", updateMessage);

router.delete("/:mid", deleteMessage);

export default router;
