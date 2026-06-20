const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Survey API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        participantHeader: {
          type: "apiKey",
          in: "header",
          name: "X-Participant-Id",
          description: "UUID",
        },
      },
    },
    security: [
      {
        participantHeader: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
});

module.exports = swaggerSpec;
