const express = require('express');
const StoreRouter = express.Router();
const { getHome, getBookings, getFavourite, getIndex } = require('../controllers/storeController');

StoreRouter.get("/", getHome);
StoreRouter.get("/store/index", getIndex);
StoreRouter.get("/store/bookings", getBookings);
StoreRouter.get("/store/favourites", getFavourite);

module.exports = StoreRouter;
