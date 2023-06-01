require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const Places = require("./models/Places");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const placeRouter = require("./routes/place");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlesMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/controllers/uploads"));

app.use("/auth", authRouter);
app.use("/user/places", userRouter);
app.use("/", placeRouter);

app.get("/delete", async (req, res) => {
  await Places.deleteMany({});
  res.json("delete");
});

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
