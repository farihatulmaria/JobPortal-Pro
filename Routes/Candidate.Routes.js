const express = require('express');
const cadiadateController = require('../Controllers/Cadiadate.Controllers');
const router = express.Router();
const uploader = require('../middlewares/uploader');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/jobs',cadiadateController.getAllJob);
router.get('/jobs/:id',cadiadateController.getAJob);
router.post('/jobs/:id/apply',verifyToken,uploader.single('pdf'),cadiadateController.applyToAJob);

module.exports = router;