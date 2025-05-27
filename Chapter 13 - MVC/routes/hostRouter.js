// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Modules
const { getAddHome, postAddHome, getHostHome } = require("../controllers/hostController");

// GET route to render form
hostRouter.get("/add-home", getAddHome);

// POST route to handle form submission
hostRouter.post("/add-home", postAddHome);

hostRouter.get("/host-home-list", getHostHome);

exports.hostRouter = hostRouter;
