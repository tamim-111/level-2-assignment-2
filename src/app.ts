import express, { Request, Response } from "express";

const app = express();
app.use(express.json());


app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Route Not Found",
        path: req.path
    })
})

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Express!");
});

export default app