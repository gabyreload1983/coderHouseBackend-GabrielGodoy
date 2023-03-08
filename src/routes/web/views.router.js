import { Router } from "express";
import Products from "../../dao/dbManagers/products.js";
import { io } from "../app.js";

const productsManager = new Products();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.getAll();
    res.render("home", { products });
  } catch (error) {}
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsManager.getAll();
    io.on("connection", (socket) => {
      console.log(`Nuevo cliente conectado. ID: ${socket.id}`);

      io.emit("realTimeProducts", products);
    });

    res.render("realTimeProducts", { products });
  } catch (error) {
    console.log(error);
  }
});

export default router;
