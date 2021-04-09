const express = require('express');
const eventController = require('./event.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const eventRouter = express.Router();
module.exports = eventRouter;

eventRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),eventController.createEvent)
    .get(eventController.getAllEvents);

eventRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), eventController.updateEvent)
    .get(eventController.getOneEvent)
    .delete(protect, authorize('admin'), eventController.deleteEvent);

eventRouter.route('/paginate/events')
    .get(eventController.findAllPaginate);