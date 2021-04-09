const express = require('express');
const studentController = require('./student.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const studentRouter = express.Router();
module.exports = studentRouter;

studentRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),studentController.createStudent)
    .get(studentController.getAllStudents);

studentRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), studentController.updateStudent)
    .get(studentController.getOneStudent)
    .delete(protect, authorize('admin'), studentController.deleteStudent);

studentRouter.route('/paginate/students')
    .get(studentController.findAllPaginate);