
import express, { Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./routes/routes";


// Setting up swagger


const app = express();

app.get("/", (request: Request, response: Response) => {
    response.json({ message: "received"});
});


app.use(router); // Get the routes



const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Openfoods scraper bot",
      version: "1.0.0",
      description:
        "Data api that scrapes products off of the openfoods website and returns the data",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ariel Carvalho",
        url: "https://arielcarvalho.io",
        email: "arieljanickcarvalho@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["**/*.ts"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.listen(3000, () => {
    console.log("Listeninig on port 3000");
});