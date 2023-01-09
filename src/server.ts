import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import routerGPU from "./routes/RoutesGPU.js";
import routerScrapper from "./routes/RoutesScrap.js";

const URL: any =
  process.env.URL ||
  "https://www.solotodo.cl/video_cards?memory_quantity_start=105536&ordering=offer_price_usd";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/", (_req, _res) => {
  _res.send(`Welcome to my webscraper!`);
});

app.use("/gpu", routerGPU);
app.use("/scrapper", routerScrapper);

const port: number = 8080;

app.listen(port || process.env.PORT, () => {
  console.log(`Server up and running on port ${port}`);
});
