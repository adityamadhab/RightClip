const express = require('express');
const router = express.Router();
const creatorRouter = require('./creator');
const businessRouter = require('./business');
const adminRouter = require('./admin');
const projectRouter = require('./project');
const industryRouter = require('./industryType');
const categoryRouter = require('./projectCategory');
const messageRouter = require('./messages');
const paymentsRouter = require('./payment');
const notificationRouter = require('./notification');

router.use('/creator', creatorRouter);
router.use('/business', businessRouter);
router.use('/admin', adminRouter);
router.use('/project', projectRouter);
router.use('/industry', industryRouter);
router.use('/category', categoryRouter);
router.use('/message', messageRouter);
router.use('/payment', paymentsRouter);
router.use('/notification', notificationRouter);

module.exports = router;