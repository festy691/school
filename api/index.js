const express = require('express');
const userRouter  = require('./resources/user');
const imageRouter  = require('./resources/image');
const authRouter  = require('./resources/auth');
const facultyRouter  = require('./resources/faculty');
const courseRouter  = require('./resources/course');
const eventRouter  = require('./resources/event');
const newsRouter  = require('./resources/news');
const ratingRouter  = require('./resources/rating');
const reportRouter  = require('./resources/report');
const studentRouter  = require('./resources/student');
const sessionRouter  = require('./resources/session');
const attendanceRouter  = require('./resources/attendance');

const restRouter = express.Router();

module.exports =  restRouter;

restRouter.use('/users', userRouter);
restRouter.use('/authenticate', authRouter);
restRouter.use('/images', imageRouter);
restRouter.use('/faculties', facultyRouter);
restRouter.use('/courses', courseRouter);
restRouter.use('/events', eventRouter);
restRouter.use('/news', newsRouter);
restRouter.use('/ratings', ratingRouter);
restRouter.use('/reports', reportRouter);
restRouter.use('/students', studentRouter);
restRouter.use('/sessions', sessionRouter);
restRouter.use('/attendance', attendanceRouter);