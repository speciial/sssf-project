const ChatModel = require("../models/ChatModel");

const socket = async (io, port) => {
  io.origins("*:*");
  io.listen(port);
  io.on("connection", async (socket) => {
    socket.on("disconnect", () => {});
    socket.on("newmessage", async (msg) => {
      await ChatModel.create(msg);
      socket.broadcast.emit("message", msg);
    });
  });
};

module.exports = socket;
