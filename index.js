const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Socket connection
io.on("connection", (socket) => {
  // console.log("A new client has connected", socket.id);
  socket.on("move mouse", (data) => {
    io.emit("move mouse", data);
  });
  socket.on("handle click", (data) => {
    io.emit("handle click", data);
  });
  socket.on("touchstart", (data) => {
    io.emit("touchstart", data);
  });
  socket.on("touchmove", (data) => {
    io.emit("touchmove", data);
  });
  socket.on("expand", (data) => {
    io.emit("expand", data);
  });
  socket.on("pinch", (data) => {
    io.emit("pinch", data);
  });
});

app.use(express.static(path.resolve("./public/")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log("Server listening on port 9000"));

// module.exports = app;
