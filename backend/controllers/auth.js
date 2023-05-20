const { StatusCodes } = require("http-status-codes");
const login = async (req, res) => {
  res.status(StatusCodes.CREATED).json({
    response: "login",
  });
};
const register = async (req, res) => {
  res.status(StatusCodes.CREATED).json({
    response: "register",
  });
};
module.exports = { login, register };
