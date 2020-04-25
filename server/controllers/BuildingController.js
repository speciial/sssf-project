'use strict';
const BuildingModel = require('../models/BuildingModel');

const getBuildings = async (req, res) => {
  try {
    const result = await BuildingModel.find({}).populate('MaterialID');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBuilding = async (req, res) => {
  try {
    const result = await BuildingModel.findById(req.params.id).populate(
      'MaterialID'
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postBuilding = async (req, res) => {
  try {
    const newBuilding = await BuildingModel.create(req.body);
    res
      .status(200)
      .send(`Successfully created building with id ${newBuilding._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBuilding = async (req, res) => {
  try {
    const delBuilding = await BuildingModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send(`Successfully deleted building with id ${delBuilding._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putBuilding = async (req, res) => {
  try {
    const updBuilding = await BuildingModel.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    res
      .status(200)
      .send(`Successfully updated building with id ${updBuilding._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBuildings,
  getBuilding,
  postBuilding,
  deleteBuilding,
  putBuilding,
};
