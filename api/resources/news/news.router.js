const express = require('express');
const newsController = require('./news.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const newsRouter = express.Router();
module.exports = newsRouter;

newsRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),newsController.createNews)
    .get(newsController.getAllNews);

newsRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), newsController.updateNews)
    .get(newsController.getOneNews)
    .delete(protect, authorize('admin'), newsController.deleteNews);

newsRouter.route('/updatepics/:id').put(protect,newsController.updateNewsImage);

newsRouter.route('/paginate/news')
    .get(newsController.findAllPaginate);