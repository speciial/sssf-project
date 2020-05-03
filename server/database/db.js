const mongoose = require("mongoose");

(async () => {
  if (process.env.DB_URL) {
    console.error("You need to set DB_URL in the .env file");
  } else {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      mongoose.set("useFindAndModify", false);
      console.log("DB connected successfully");
    } catch (err) {
      console.error("Connection to db failed", err);
    }
  }
})();

module.exports = mongoose.connection;
