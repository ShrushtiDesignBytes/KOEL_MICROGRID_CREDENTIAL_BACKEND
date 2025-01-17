const express = require('express');
const { getRole, createRole } = require('./role_controller');

const router = express.Router();

//get all Overview
router.get('/', getRole);

//add Overview
router.post('/', createRole) 

module.exports = router;