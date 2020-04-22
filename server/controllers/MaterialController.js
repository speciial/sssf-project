'use strict';
const MaterialModel = require('../models/MaterialModel');

const getMaterials = async (req, res) => {
  try {
    const result = await MaterialModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaterial = async (req, res) => {
  try {
    const result = await MaterialModel.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postMaterial = async (req, res) => {
  try {
    const newMaterial = await MaterialModel.create(req.body);
    res
      .status(200)
      .send(`Successfully created material with id ${newMaterial._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const delMaterial = await MaterialModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send(`Successfully deleted material with id ${delMaterial._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putMaterial = async (req, res) => {
  try {
    const updMaterial = await MaterialModel.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    res
      .status(200)
      .send(`Successfully updated material with id ${updMaterial._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMaterials,
  getMaterial,
  postMaterial,
  deleteMaterial,
  putMaterial,
};
