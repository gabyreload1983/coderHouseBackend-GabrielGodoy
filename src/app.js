import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
// import viewsRouter from "./routes/fileSystem/views.router.js";
// import productsRouter from "./routes/fileSystem/products.router.js";
// import cartsRouter from "./routes/fileSystem/carts.router.js";
import viewsRouter from "./routes/web/views.router.js";
import productsRouter from "./routes/api/products.router.js";
import cartsRouter from "./routes/api/carts.router.js";
import { mongoose } from "mongoose";

import Messages from "./dao/dbManagers/messages.js";
const messagesManager = new Messages();

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
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado. ID: ${socket.id}`);

  socket.on("message", async ({ user, message }) => {
    await messagesManager.addMessage(user, message);
    const messages = await messagesManager.getAll();

    io.emit("messageLogs", messages);
  });

  socket.on("authenticated", async (user) => {
    const messages = await messagesManager.getAll();
    socket.emit("messageLogs", messages);
    socket.broadcast.emit("newUserConnected", user);
  });
});

export { io };
