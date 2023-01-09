import * as db from "../db/db.js";
import gpuModel from "../models/gpuSchema.js";
import { GPU } from "../types/interfaces.js";
import { Request, Response, NextFunction } from "express";

export const getAllGPU = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.connection();
    const gpuList: GPU[] = await gpuModel.find();
    db.disconnect();
    res.sendStatus(200).json({ GPUs: gpuList });
  } catch (error) {
    res.sendStatus(200).json({ message: error });
  }
};

export const createGPU = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: GPU = {
      title: req.body.title,
      price: req.body.price,
      img: req.body.img,
      name: req.body.name,
      memorySize: req.body.memorySize,
      coreFrecuency: req.body.coreFrecuency,
      memoryFrecuency: req.body.memoryFrecuency,
      bus: req.body.bus,
      date: req.body.date,
      time: req.body.time,
    };
    if (
      !data.title ||
      !data.price ||
      !data.img ||
      !data.name ||
      !data.memorySize ||
      !data.coreFrecuency ||
      !data.memoryFrecuency ||
      !data.bus ||
      !data.date ||
      !data.time
    )
      return res.status(200).json({ error: "One or more fields is missing" });
    await db.connection().catch((error) => {
      res.status(500).json({ message: "db connection has failded", error });
    });
    const gpu = await gpuModel.create(data).catch((error) => {
      res.status(500).json({ message: "db insertion has failed", error });
    });
    setTimeout(
      () =>
        db.disconnect().catch((error) => {
          res.status(408).json({ error });
        }),
      1500
    );
    res.status(200).json({ message: "GPU insertion succesfull" });
  } catch (error) {
    res.status(500).json({ message: "gpu insertion has failed", error });
  }
};
