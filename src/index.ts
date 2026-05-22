import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger.js";

import eventRoutes from "./routes/eventRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import pembicaraRoutes from "./routes/pembicaraRoute.js";

const app = express();
const port = 3000;

app.use(cors({
  origin: "*"
}));
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
