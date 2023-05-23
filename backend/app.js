require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
const authRouter = require("./routes/auth");
const profile = require("./routes/user");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlesMiddleware = require("./middleware/authentication");

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
// app.use("/user/profile", authenticateUser, profile);

app.use(notFoundMiddleware);
app.use(errorHandlesMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Port is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
