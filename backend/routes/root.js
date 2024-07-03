const express = require('express');
const router = express.Router();
const creatorRouter = require('./creator');
const businessRouter = require('./business');
const adminRouter = require('./admin');
const projectRouter = require('./project');

router.use('/creator', creatorRouter);
router.use('/business', businessRouter);
router.use('/admin', adminRouter);
router.use('/project', projectRouter);

module.exports = router;