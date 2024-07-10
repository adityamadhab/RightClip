const express = require('express');
const router = express.Router();
const creatorRouter = require('./creator');
const businessRouter = require('./business');
const adminRouter = require('./admin');
const projectRouter = require('./project');
const industryRouter = require('./industryType');
const categoryRouter = require('./projectCategory');

router.use('/creator', creatorRouter);
router.use('/business', businessRouter);
router.use('/admin', adminRouter);
router.use('/project', projectRouter);
router.use('/industry', industryRouter);
router.use('/category', categoryRouter);

module.exports = router;