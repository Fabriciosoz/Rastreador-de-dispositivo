const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const devices = new Map();

io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  socket.on("device:location", (data) => {
    devices.set(socket.id, { ...data, updateAt: Date.now() });
    io.emit("admin:update", Array.from(devices.values()));
  });

  socket.on("disconnect", () => {
    devices.delete(socket.id);
    io.emit("admin:update", Array.from(devices.values()));
  });
});

server.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
