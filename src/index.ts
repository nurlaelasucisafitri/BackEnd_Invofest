import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";

import eventRoutes from "./routes/eventRoute";
import categoryRoutes from "./routes/categoryRoute";
import pembicaraRoutes from "./routes/pembicaraRoute";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
    res.send("Ini adalah api untuk Invofest");
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/pembicara", pembicaraRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
