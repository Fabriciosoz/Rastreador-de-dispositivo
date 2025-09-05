const express = require("express");
const http = require("http");
const cors = require("cors");
const {server} = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {cors: {origen:"*"}});

const devices = new Map();

io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  // Quando o dispositivo enviar sua localização
  socket.on("device:location", (data) => {
    // Armazena a localização desse dispositivo
    devices.set(socket.id, { ...data, updatedAt: Date.now() });

    // Atualiza todos os administradores com a lista de dispositivos
    io.emit("admin:update", Array.from(devices.values()));
  });

  // Quando o dispositivo se desconectar
  socket.on("disconnect", () => {
    devices.delete(socket.id); // Remove o dispositivo do mapa
    io.emit("admin:update", Array.from(devices.values())); // Atualiza admins
  });
});
app.get("/",(__, res)=> res,send("servidor do Rastreador funcionando"));
const PORT= 3001;
server.listen(PORT, ()=>console.log("servidor rodando em http://localhost:${PORT}"));
