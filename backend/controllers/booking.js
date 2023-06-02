const { StatusCodes } = require("http-status-codes");
const Bookings = require("../models/Booking");

const bookPlace = async (req, res) => {
  req.body.owner = req.user.userId;
  const bookingData = await Bookings.create(req.body);
  res.status(StatusCodes.CREATED).json({ bookingData });
};
const getAllBookings = async (req, res) => {
  const bookings = await Bookings.find({ owner: req.user.userId });
  res.status(StatusCodes.OK).json({ bookings, count: bookings.length });
};

module.exports = { bookPlace, getAllBookings };
