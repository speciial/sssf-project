const ChatModel = require("../models/ChatModel");

const socket = async (io, port, limitMessage) => {
  io.origins("*:*");
  io.listen(port);
  io.on("connection", async (socket) => {
    const msgs = await ChatModel.find({})
      .sort({ Time: -1 })
      .limit(limitMessage);
    msgs.reverse();
    io.emit("messages", msgs);
    socket.on("disconnect", () => {});
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
