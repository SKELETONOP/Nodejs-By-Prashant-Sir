// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Modules
const { getAddHome, postAddHome, getHostHome, getEditHome, postEditHome, postDeleteHome } = require("../controllers/hostController");

// GET route to render form
hostRouter.get("/add-home", getAddHome);

// POST route to handle form submission
hostRouter.post("/add-home", postAddHome);

hostRouter.get("/host-home-list", getHostHome);
hostRouter.get("/edit-home/:homeId", getEditHome);
hostRouter.post("/edit-home", postEditHome);
hostRouter.post("/delete-home/:homeId", postDeleteHome);

exports.hostRouter = hostRouter;
