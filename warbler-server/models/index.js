const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/warbler", {
  keepAlive: true,

  useNewUrlParser: true
});
module.exports.User = require("./user");
module.exports.Message = require("./message");
