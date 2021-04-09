const express = require('express');
const sessionController = require('./session.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const sessionRouter = express.Router();
module.exports = sessionRouter;

sessionRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),sessionController.createSession)
    .get(sessionController.getAllSessions);

sessionRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), sessionController.updateSession)
    .get(sessionController.getOneSession)
    .delete(protect, authorize('admin'), sessionController.deleteSession);

sessionRouter.route('/paginate/sessions')
    .get(sessionController.findAllPaginate);