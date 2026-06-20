const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const db = require("./config/db");
const express = require("express");
const surveyRoutes = require("./routes/survey.routes");
const participantRoutes = require("./routes/participant.routes");
const app = express();
const swaggerSpec = require("./config/swagger");

app.use(express.json());

// Swagger UI Endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/participants", participantRoutes);

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
