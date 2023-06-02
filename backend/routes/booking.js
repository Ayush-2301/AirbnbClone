const express = require("express");
const router = express.Router();
const { bookPlace, getAllBookings } = require("../controllers/booking");
const authenticate = require("../middleware/authentication");
router.post("/createBooking", authenticate, bookPlace);
router.get("/getAllBookings", authenticate, getAllBookings);
module.exports = router;
