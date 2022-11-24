import express from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import * as dotenv from "dotenv";
dotenv.config();

const url: any = process.env.URL;

const app = express();

app.get("/", (_req, _res) => {
  _res.send("Welcome to my webscraper!");
});

type GPU = {
  title: string;
  img: string;
  memory: string;
  coreFrecuency: string;
  bus: string;
};

puppeteer
  .launch()
  .then((browser) => browser.newPage())
  .then((page) => {
    return page.goto(url).then(function () {
      return page.content();
    });
  })
  .then((html) => {
    const $ = cheerio.load(html);
    let gpuArr: GPU[] = [];
    $(".category-browse-result").each(function (this: GPU) {
      const img: any = $(this)
        .find("div > .image-container > a > img")
        .attr("src");
      const title: string = $(this)
        .find(".description-container > dl dd:nth-child(2)")
        .text();
      const memory: string = $(this)
        .find(".description-container > dl dd:nth-child(4)")
        .text();
      const coreFrecuency: string = $(this)
        .find(".description-container > dl dd:nth-child(6)")
        .text();
      const bus: string = $(this)
        .find(".description-container > dl dd:nth-child(8)")
        .text();
      const gpu: GPU = { title, img, memory, coreFrecuency, bus };
      gpuArr.push(gpu);
    });
    console.log(gpuArr);
    console.log(`You have scraped ${gpuArr.length} registries`);
  })
  .catch(console.error);

const port: number = 8080;

app.listen(port || process.env.PORT, () => {
  console.log(`Server up and running on port ${port}`);
});
