import express from "express";
import { scrapData } from "../controllers/scrapperController.js";

const routerScrapper = express.Router();

routerScrapper.get("/", scrapData);

export default routerScrapper;
