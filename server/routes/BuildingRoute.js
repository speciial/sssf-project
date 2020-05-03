'use strict';
const express = require('express');
const router = express.Router();

const BuildController = require('../controllers/BuildingController');

router.get('/', BuildController.getBuildings);

router.get('/:id', BuildController.getBuilding);

router.post('/', BuildController.postBuilding);

router.delete('/:id', BuildController.deleteBuilding);

router.put('/', BuildController.putBuilding);

module.exports = router;
