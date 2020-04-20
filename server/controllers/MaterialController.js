'use strict';
const MaterialModel = require('../models/MaterialModel');

const getMaterials = async (req, res) => {
  try {
    const result = await MaterialModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const getMaterial = async (req, res) => {
  try {
    const result = await MaterialModel.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const postMaterial = async (req, res) => {
  res.status(501).send('Not yet implemented');
};

const deleteMaterial = async (req, res) => {
  res.status(501).send('Not yet implemented');
};

const putMaterial = async (req, res) => {
  res.status(501).send('Not yet implemented');
};

module.exports = {
  getMaterials,
  getMaterial,
  postMaterial,
  deleteMaterial,
  putMaterial,
};
