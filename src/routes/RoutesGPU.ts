import express from "express";
import { getAllGPU, createGPU } from "../controllers/gpuController.js";

const routerGPU = express.Router();

routerGPU.get("/list", getAllGPU);
routerGPU.post("/create", createGPU);

export default routerGPU;
