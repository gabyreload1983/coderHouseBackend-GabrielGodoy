import { Router } from "express";
import fs from "fs";
import path from "path";
import { __dirname, generateId, writeInfo, readInfo } from "../utils.js";

const router = Router();

const cartsPath = path.join(__dirname, "../files/carts.json");
if (!fs.existsSync(cartsPath))
  await fs.promises.writeFile(cartsPath, JSON.stringify([]));

router.post("/", async (req, res) => {
  try {
    const data = await readInfo(cartsPath);
    const carts = JSON.parse(data);
    const cart = { id: generateId(carts), products: [] };
    carts.push(cart);
    await writeInfo(carts, cartsPath);
    res.send({ status: "success", message: "cart created" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
