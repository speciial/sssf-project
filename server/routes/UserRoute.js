"use strict";
const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUser);

router.post("/", UserController.postUser);

router.delete("/:id", UserController.deleteUserById);

router.put("/", UserController.putUser);

module.exports = router;
