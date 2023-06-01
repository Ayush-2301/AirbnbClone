const express = require("express");
const router = express.Router();
const { getAllPlaces } = require("../controllers/user");

router.get("/getAllplaces", getAllPlaces);

module.exports = router;
