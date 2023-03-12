import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/web/views.router.js";
import productsRouter from "./routes/api/products.router.js";
import cartsRouter from "./routes/api/carts.router.js";
import { mongoose } from "mongoose";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

try {
  await mongoose.connect(
    "mongodb+srv://gabriel:Jano1987@coderhouse.gszwtre.mongodb.net/ecommerce?retryWrites=true&w=majority"
  );
  console.log("Connected to Atlas mongoDB");
} catch (error) {
  console.log(error);
}

const server = app.listen(8080, () => console.log("Listening on port 8080"));

export const io = new Server(server);
