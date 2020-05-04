const ChatModel = require("../models/ChatModel");

const socket = async (io, port, limitMessage) => {
  io.origins("*:*");
  io.listen(port);
  io.on("connection", async (socket) => {
    socket.on("disconnect", () => {});
    socket.on("newmessage", async (msg) => {
      await ChatModel.create(msg);
      const msgs = await ChatModel.find({})
        .sort({ Time: -1 })
        .limit(limitMessage);
      msgs.reverse();
      socket.broadcast.emit("message", msg);
    });
  });
};

module.exports = socket;
