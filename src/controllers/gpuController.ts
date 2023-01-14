import * as db from "../db/db.js";
import gpuModel from "../models/gpuSchema.js";
import { GPU } from "../types/interfaces.js";
import { Request, Response, NextFunction } from "express";

export const getAllGPU = async (req: Request, res: Response) => {
  try {
    await db.connection().catch((error) => {
      res
        .status(500)
        .json({ code: 1, description: "db connection has failed" });
    });
    const gpuList: GPU[] = await gpuModel.find();
    if (gpuList.length === 0)
      return res.status(200).json({
        code: 4,
        description: "Cannot find any GPUs entries in the db",
      });
    setTimeout(
      () =>
        db.disconnect().catch((error) => {
          res
            .status(408)
            .json({ code: 2, description: "db disconnection has failed" });
        }),
      1500
    );
    res.status(200).json({ GPUs: gpuList });
  } catch (error) {
    res.status(500).json({ code: 3, description: "Internal error" });
  }
};

export const createGPU = async (req: Request, res: Response) => {
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
      return res
        .status(200)
        .json({ code: 5, description: "One or more fields is missing" });
    await db.connection().catch((error) => {
      res
        .status(500)
        .json({ code: 1, description: "db connection has failed" });
    });
    const gpu = await gpuModel.create(data).catch((error) => {
      res
        .status(500)
        .json({ code: 4, description: "GPU regestry insertion has failed" });
    });
    setTimeout(
      () =>
        db.disconnect().catch((error) => {
          res
            .status(408)
            .json({ code: 2, description: "db disconnection has failed" });
        }),
      1500
    );
    res.status(200).json({ message: "GPU regestry insertion succesfull" });
  } catch (error) {
    res.status(500).json({ code: 3, description: "Internal error" });
  }
};
