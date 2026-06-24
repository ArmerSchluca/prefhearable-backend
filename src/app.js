const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const db = require("./config/db");
const express = require("express");
const surveyRoutes = require("./routes/survey.routes");
const participantRoutes = require("./routes/participant.routes");
const health = require("./routes/health.routes");
const app = express();
const swaggerSpec = require("./config/swagger");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Express-Server is running!");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/participants", participantRoutes);
app.use("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

async function connect() {
  const port = 3000;
  try {
    await db.establishConnection();

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.error("Server not started because DB is down");
    process.exit(1);
  }
}

connect();
