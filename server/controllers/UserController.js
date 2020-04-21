"use strict";
const UserModel = require("../models/UserModel");

const getUsers = async (req, res) => {
  try {
    const result = await UserModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const getUser = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const postUser = async (req, res) => {
  res.status(501).send("Not yet implemented");
};

const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send(`Sucessfully  deleted user with id ${user._id}`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const putUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.send(`User created with id ${user._id}`);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  deleteUserById,
  putUser,
};
