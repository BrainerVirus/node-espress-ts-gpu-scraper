import mongoose from "mongoose";
import { GPU } from "../types/interfaces";
const Schema = mongoose.Schema;

const gpuSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  memorySize: {
    type: String,
    required: true,
  },
  coreFrecuency: {
    type: String,
    required: true,
  },
  memoryFrecuency: {
    type: String,
    required: true,
  },
  bus: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const gpuModel = mongoose.model<GPU>("GPU", gpuSchema);

export default gpuModel;
