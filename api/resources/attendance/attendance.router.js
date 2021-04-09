const express = require('express');
const attendanceController = require('./attendance.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const attendanceRouter = express.Router();
module.exports = attendanceRouter;

attendanceRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),attendanceController.createAttendance)
    .get(attendanceController.getAllAttendances);

attendanceRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), attendanceController.updateAttendance)
    .get(attendanceController.getOneAttendance)
    .delete(protect, authorize('admin'), attendanceController.deleteAttendance);

attendanceRouter.route('/paginate/attendances')
    .get(attendanceController.findAllPaginate);