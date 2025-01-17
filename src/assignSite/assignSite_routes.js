const express = require('express');
const { getAssignSite, createAssignSite } = require('./assignSite_controller');

const router = express.Router();

//get all Overview
router.get('/:id', getAssignSite);

//add Overview
router.post('/:id', createAssignSite) 

module.exports = router;