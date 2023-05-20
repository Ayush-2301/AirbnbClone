const mongoose = require("mongoose");
const connecDB = (url) => {
  return mongoose.connect(url);
};
module.exports = connecDB;
