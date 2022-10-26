const express = require('express')
const router = express.Router();
const multer = require('multer')        //To render the multipart/form type
const CatchAsync = require('../utils/CatchAsync')
const campgrounds = require('../controllers/campgrounds')
const { isLogedIn, isAuthor, validateCampground } = require('../middleware')
const { storage } = require('../cloudinary')
const upload = multer({ storage })



router.get('/', CatchAsync(campgrounds.index))

router.route('/new')
    .get(isLogedIn, campgrounds.renderNewForm)
    .post(isLogedIn, upload.array('image'), validateCampground, CatchAsync(campgrounds.creatNewCampground))

router.route('/:id')
    .get(CatchAsync(campgrounds.showCampground))
    .delete(isLogedIn, isAuthor, CatchAsync(campgrounds.deleteCampground))

router.route('/:id/edit')
    .get(isLogedIn, isAuthor, CatchAsync(campgrounds.renderEditForm))
    .put(isLogedIn, isAuthor, upload.array('image'), validateCampground, CatchAsync(campgrounds.editCampground))



module.exports = router