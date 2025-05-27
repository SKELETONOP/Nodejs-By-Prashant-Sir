const express = require('express');
const StoreRouter = express.Router();
const { getHome, getBookings, getFavourite, getIndex, getHomeDetails, postAddToFavourites, postRemoveFromFavourites } = require('../controllers/storeController');

StoreRouter.get("/", getHome);
StoreRouter.get("/store/index", getIndex);
StoreRouter.get("/store/bookings", getBookings);
StoreRouter.get("/store/favourites", getFavourite);
StoreRouter.post("/store/favourites", postAddToFavourites);
StoreRouter.post("/favourites/delete/:homeId", postRemoveFromFavourites);
StoreRouter.get('/homes/:id', getHomeDetails);

module.exports = StoreRouter;
