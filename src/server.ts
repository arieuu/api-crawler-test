import express, { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response) => {
    response.json({ message: "received"});
});

app.listen(3000, () => {
    console.log("Listeninig on port 3000");
});