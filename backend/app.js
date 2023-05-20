require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use("/auth", authRouter);

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
