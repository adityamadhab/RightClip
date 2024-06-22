const express = require('express');
const router = express.Router();
const creatorRouter = require('./creator');
const businessRouter = require('./business');

router.use('/creator', creatorRouter);
router.use('/business', businessRouter);

module.exports = router;