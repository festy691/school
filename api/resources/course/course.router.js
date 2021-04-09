const express = require('express');
const courseController = require('./course.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const courseRouter = express.Router();
module.exports = courseRouter;

courseRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),courseController.createCourse)
    .get(courseController.getAllCourses);

courseRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), courseController.updateCourse)
    .get(courseController.getOneCourse)
    .delete(protect, authorize('admin'), courseController.deleteCourse);

courseRouter.route('/paginate/courses')
    .get(courseController.findAllPaginate);