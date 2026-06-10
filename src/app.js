const db = require("./db/db");
const express = require("express");
const userRoutes = require("./routes/user.routes");
const { start } = require("./helper/start");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

start(app);
