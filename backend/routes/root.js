const express = require('express');
const router = express.Router();
const creatorRouter = require('./creator');
const businessRouter = require('./business');
const adminRouter = require('./admin');

router.use('/creator', creatorRouter);
router.use('/business', businessRouter);
router.use('/admin', adminRouter);

module.exports = router;