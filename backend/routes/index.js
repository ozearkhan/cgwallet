const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const accountRouter = require("./account");



router.use('/user', userRoutes);
router.use('/account', accountRouter);


module.exports=router;