const express = require('express');
const { getSite, createSite } = require('./site_controller');

const router = express.Router();

//get all Overview
router.get('/', getSite);

//add Overview
router.post('/', createSite) 

module.exports = router;