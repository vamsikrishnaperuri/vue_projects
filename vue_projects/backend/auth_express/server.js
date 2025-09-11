const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const config = require("./config/config");
const cors = require("cors")

const authRoutes = require("./src/routes/authRoutes");

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use("/api", authRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
});
