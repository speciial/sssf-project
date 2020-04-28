const ChatModel = require("../models/ChatModel");

const socket = async (io, port, limitMessage) => {
  io.origins("*:*");
  io.listen(port);
  io.on("connection", async (socket) => {
    console.log("New client connected");
    const msgs = await ChatModel.find({})
      .sort({ Time: -1 })
      .limit(limitMessage);
    msgs.reverse();
    io.emit("messages", msgs);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    socket.on("message", async (msg) => {
      await ChatModel.create(msg);
      const msgs = await ChatModel.find({})
        .sort({ Time: -1 })
        .limit(limitMessage);
      msgs.reverse();
      io.emit("messages", msgs);
    });
  });
};

module.exports = socket;