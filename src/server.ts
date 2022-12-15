import express from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import * as dotenv from "dotenv";
dotenv.config();

import { GPU, Page } from "./types/interfaces";

const url: any =
  process.env.URL ||
  "https://www.solotodo.cl/video_cards?memory_quantity_start=105536&ordering=offer_price_usd&";

const app = express();

app.get("/", (_req, _res) => {
  scrapping();
  _res.send("Welcome to my webscraper!");
});

const scrapping = async () => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    console.log("this is the scrapping");
    // Create a new page
    const page = await browser.newPage();

    // Go to the website
    await page.goto(url);

    // Extract the pagination information
    const html = await page.content();
    const $ = cheerio.load(html);
    const pagination: Page = { lastPageNumber: 0 };
    $(".pagination").each(function (this: Page) {
      const lastPageNumber: number = parseInt(
        $(this).find(".page-item:nth-last-child(2) > a").text().trim()
      );
      pagination.lastPageNumber = lastPageNumber;
    });

    // Scrape the data from each page
    for (let i: number = 1; i <= pagination.lastPageNumber; i++) {
      // Go to the page
      await page.goto(`${url}${i === 1 ? "" : `page=${i}&`}`);

      // Extract the data
      const html = await page.content();
      const $ = cheerio.load(html);
      const gpuArr: GPU[] = [];
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
    }
  } catch {
    console.error;
  }
};

const port: number = 8080;

app.listen(port || process.env.PORT, () => {
  console.log(`Server up and running on port ${port}`);
});
