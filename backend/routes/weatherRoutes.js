const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/", weatherController.getWeather);
router.get("/coords", weatherController.getWeatherByCoords);

module.exports = router;
