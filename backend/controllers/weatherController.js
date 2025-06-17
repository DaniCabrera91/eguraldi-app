const { default: axios } = require("axios");
const db = require("../db/connection");

const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);

const fetchWeather = async (url) => {
  const { data } = await axios.get(url);
  const { name, coord, main, weather } = data;
  const tempCelsius = kelvinToCelsius(main.temp);

  await db.execute(
    `INSERT INTO weather_data (city, lat, lon, temperature, weather) VALUES (?, ?, ?, ?, ?)`,
    [name, coord.lat, coord.lon, tempCelsius, weather[0].main]
  );

  return {
    city: name,
    lat: coord.lat,
    lon: coord.lon,
    temperature: tempCelsius,
    weather: weather[0].main,
  };
};

exports.getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city)
    return res.status(400).json({ error: "falta el parámetro ?city=" });

  try {
    const weatherData = await fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWATHER_KEY}`
    );
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos del clima" });
  }
};

exports.getWeatherByCoords = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon)
    return res.status(400).json({ error: "Faltan parámetros ?lat= & ?lon=" });

  try {
    const weatherData = await fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWATHER_KEY}`
    );
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener clima por coordenadas" });
  }
};
