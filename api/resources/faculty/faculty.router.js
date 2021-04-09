const express = require('express');
const facultyController = require('./faculty.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const facultyRouter = express.Router();
module.exports = facultyRouter;

facultyRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),facultyController.createFaculty)
    .get(facultyController.getAllFaculties);

facultyRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), facultyController.updateFaculty)
    .get(facultyController.getOneFaculty)
    .delete(protect, authorize('admin'), facultyController.deleteFaculty);

facultyRouter.route('/updatepics/:id').put(protect,facultyController.updateFacuImage);

facultyRouter.route('/paginate/faculties')
    .get(facultyController.findAllPaginate);