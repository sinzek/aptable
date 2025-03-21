import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const clientOrigin = process.env.CLIENT_ORIGIN;

app.use(express.json());
app.use(cors({ origin: clientOrigin }))

// error checking
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

app.get("/", (req, res) => {
    res.send("Hello worldddd!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});