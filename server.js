require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/tasks");
const logRoutes = require("./src/routes/logs");

app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", logRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
