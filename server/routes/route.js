const express = require('express');
const imageController = require('../controllers/imageController');  // <- This is a new Line
const { upload } = require('../utils/multer');  // <- This is a new Line

const Router = express.Router();

Router.post("/", upload.single('image'), imageController.uploadImage);  // <- This is a new Line

module.exports = Router;
