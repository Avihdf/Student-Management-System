const express = require('express');
const router = express.Router();
const adminjwtmiddleware = require('../../Middlewares/adminjwtmiddleware');
const courseController = require('../../controllers/admin/courselistcontroller');
const upload = require('../../Middlewares/multer');

router.get('/course-list', adminjwtmiddleware, courseController.getCourseList);
router.delete('/delete-course/:id', adminjwtmiddleware, courseController.deleteCourse);
router.patch('/toggle-course/:id', adminjwtmiddleware, courseController.activeDeactiveCourse);
router.put('/edit-course/:id', adminjwtmiddleware, upload.single('thumbnail'), courseController.editCourse);

module.exports = router;
