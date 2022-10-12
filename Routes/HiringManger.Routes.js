const express = require('express');
const mangerController = require('../Controllers/HiringManger.Controller');
const { authorization } = require('../middlewares/authorization');
const router = express.Router();

router.post('/jobs',authorization("Hiring Manager,Admin"),mangerController.addAJob)
router.patch('/jobs/:id',authorization("Hiring Manager,Admin"),mangerController.updateAJob)
router.get('/:manager/jobs',authorization("Hiring Manager,Admin"),mangerController.getAllJobsOfTheManager)
router.get('/:manager/jobs/:id',authorization("Hiring Manager,Admin"),mangerController.getAJobsOfTheManager)

module.exports = router