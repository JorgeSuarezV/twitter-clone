import swaggerJsdoc from "swagger-jsdoc";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Twitter Clone",
      version: "0.1.0",
      description:
        "This is a twitter clone",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/swagger/*.ts"],
};


export const specs = swaggerJsdoc(options);
