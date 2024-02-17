import express, { Request, Response } from "express";
import router from "./routes";

const app = express();

app.get("/", (request: Request, response: Response) => {
    response.json({ message: "received"});
});

app.use(router); // Get the routes

app.listen(3000, () => {
    console.log("Listeninig on port 3000");
});