const multer = require('multer');

const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

const { cloudinary } = require('../utils/cloudinary');
const { upload } = require("../utils/multer");

exports.uploadImage = catchAsync(async (req, res, next) => {

    let cloudinaryResponse;

    try{
        if (req.file) {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            console.log(cloudinaryResponse);
        } else {
            return next(new AppError('Please provide a file', 400));
        }
    
        res.status(200).json({
            status: 'success',
            data: {
                imageUrl: cloudinaryResponse?.url,
            },
        });
    }catch(err){
        throw new Error(err);
    }
});

