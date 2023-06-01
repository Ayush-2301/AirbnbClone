const express = require("express");
const router = express.Router();
const {
  uploadPhotos,
  uploadPhotosByDevice,
  createPlaces,
  getAllUserPlaces,
  getSinglePlace,
  updatePlace,
} = require("../controllers/user");
const multer = require("multer");
const authenticateUser = require("../middleware/authentication");
const photosMiddleware = multer({
  dest: "../backend/controllers/uploads/",
});

router.post("/upload-by-link", authenticateUser, uploadPhotos);
router.post(
  "/upload-by-device",
  photosMiddleware.array("photos", 100),
  uploadPhotosByDevice
);
router.post("/create", authenticateUser, createPlaces);
router.get("/getAllUserPlaces", authenticateUser, getAllUserPlaces);
router.patch("/updatePlace/:id", authenticateUser, updatePlace);
router.get("/getSinglePlace/:id", getSinglePlace);
module.exports = router;

// router.post("/delete-by-link", deletePhotos);
