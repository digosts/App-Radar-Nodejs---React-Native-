const express = require('express');
const app = express();
const cors = require('cors');
const bodyParse = require('body-parser');

const prestadorRoutes = require("./routes/PrestadorRoutes");

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// Cors
app.use(cors());
  
// Rotas
app.use("/prestador", prestadorRoutes);
  
module.exports = app;