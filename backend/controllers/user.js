const download = require("image-downloader");
const { StatusCodes } = require("http-status-codes");
const Place = require("../models/Places");
const fs = require("fs");
const pathFinder = require("path");
const { STATUS_CODES } = require("http");

const uploadPhotos = async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.status(StatusCodes.CREATED).json(newName);
};
const uploadPhotosByDevice = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const filename = pathFinder.basename(newPath);
    uploadedFiles.push(filename);
  }
  res.status(StatusCodes.CREATED).json(uploadedFiles);
};

const createPlaces = async (req, res) => {
  req.body.owner = req.user.userId;
  const place = await Place.create(req.body);
  res.status(StatusCodes.CREATED).json({ place });
};

const getAllUserPlaces = async (req, res) => {
  const places = await Place.find({ owner: req.user.userId });
  res.status(StatusCodes.OK).json({ places, count: places.length });
};

const getSinglePlace = async (req, res) => {
  const id = req.params.id;
  const place = await Place.findOne({ _id: id });
  res.status(StatusCodes.OK).json(place);
};

const updatePlace = async (req, res) => {
  const {
    body: {
      title,
      address,
      photos,
      description,
      perksCollection,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    },
    user: { userId },
    params: { id },
  } = req;

  const place = await Place.findByIdAndUpdate(
    {
      _id: id,
      owner: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json(place);
};

const getAllPlaces = async (req, res) => {
  const places = await Place.find();
  res.status(StatusCodes.OK).json({ places, count: places.length });
};

module.exports = {
  uploadPhotos,
  uploadPhotosByDevice,
  createPlaces,
  getAllUserPlaces,
  getSinglePlace,
  updatePlace,
  getAllPlaces,
};

// const deletePhotos = (req, res) => {
//   const { link } = req.body;

//   const imagePath = path.join(__dirname, "/upload/", link);

//   if (fs.existsSync(imagePath)) {
//     fs.unlinkSync(imagePath);
//     res.status(200).json({ message: "Image deleted successfully" });
//   } else {
//     res.status(404).json({ message: "Image not found" });
//   }
// };
