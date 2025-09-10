const express = require('express');
const router = express.Router();
const adminjwtmiddleware = require('../../Middlewares/adminjwtmiddleware');
const courseController = require('../../controllers/admin/addcoursecontroller');
const upload = require('../../Middlewares/multer');

// POST /admin/add-course
router.post('/add-course', adminjwtmiddleware, upload.single('thumbnail'), courseController.addCourse);

module.exports = router;
