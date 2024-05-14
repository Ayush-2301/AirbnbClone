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
const bookingRouter = require("./routes/booking");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlesMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(__dirname + "/controllers/uploads"));

app.use("/auth", authRouter);
app.use("/user/places", userRouter);
app.use("/", placeRouter);
app.use("/booking", bookingRouter);

app.use(notFoundMiddleware);
app.use(errorHandlesMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(4000, () => {
      console.log(`Port is running on port ${4000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
