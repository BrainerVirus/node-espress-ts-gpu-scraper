import { Date } from "mongoose";

export type GPU = {
  title: string;
  price: string;
  img: string;
  name: string;
  memorySize: string;
  coreFrecuency: string;
  memoryFrecuency: string;
  bus: string;
  date: string;
  time: string;
};

export type Page = {
  lastPageNumber: number;
};
