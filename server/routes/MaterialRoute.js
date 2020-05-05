'use strict';
const express = require('express');
const router = express.Router();

const MaterialController = require('../controllers/MaterialController');

router.get('/', MaterialController.getMaterials);

router.get('/:id', MaterialController.getMaterial);

router.post('/', MaterialController.postMaterial);

router.delete('/:id', MaterialController.deleteMaterial);

router.put('/', MaterialController.putMaterial);

module.exports = router;
