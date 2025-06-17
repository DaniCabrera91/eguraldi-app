const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/weather", weatherRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () =>
  console.log(`Servidor inicializado en el puerto ${PORT}`)
);
