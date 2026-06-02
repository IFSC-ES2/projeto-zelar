import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zelar API",
      version: "1.0.0",
      description: "Documentacao da API do projeto Zelar",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/docs/openapi/**/*.yaml"],
});
