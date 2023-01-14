import { Request, Response } from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import url from "node:url";
import * as db from "../db/db.js";
import { GPU, Page } from "../types/interfaces";
import gpuModel from "../models/gpuSchema.js";

const URL: any =
  process.env.URL ||
  "https://www.solotodo.cl/video_cards?memory_quantity_start=105536&ordering=offer_price_usd";

export const scrapData = async (req: Request, res: Response) => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();

    // Go to the website
    await page.goto(URL);

    // Extract the pagination information
    const html = await page.content();
    const $ = cheerio.load(html);
    const pagination: Page = { lastPageNumber: 0 };
    await page.click('button[aria-label="Go to last page"]');
    const URL2 = await page.evaluate(() => document.location.href);
    const queryData = url.parse(URL2, true).query;
    pagination.lastPageNumber = parseInt(queryData.page as string);

    // Scrape the data from each page
    let totalDataScrapred: number = 0;
    await db.connection().catch((error) => {
      res
        .status(500)
        .json({ code: 1, description: "db connection has failded" });
    });
    for (let i: number = 1; i <= pagination.lastPageNumber; i++) {
      // Go to the page
      await page.goto(`${process.env.URL}${i === 1 ? "" : `&page=${i}`}`);
      // Extract the data
      const html = await page.content();
      const $ = cheerio.load(html);
      const gpuArr: GPU[] = [];
      $(
        "div.MuiGrid-root.MuiGrid-item > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiCard-root > button.MuiButtonBase-root.MuiCardActionArea-root > div > a > div.MuiBox-root"
      ).each(function (this: GPU) {
        const img: any = $(this)
          .find(
            "div.MuiBox-root > span.MuiBox-root > span.wrapper.lazy-load-image-background.blur > img.MuiBox-root"
          )
          .attr("src");
        const title: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(2)")
          .text();
        const price: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(3)")
          .text();

        const name: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(4) dl dd:nth-child(2)")
          .text();
        const memorySize: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(4) dl dd:nth-child(4)")
          .text();
        const coreFrecuency: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(4) dl dd:nth-child(6)")
          .text();
        const memoryFrecuency: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(4) dl dd:nth-child(8)")
          .text();
        const bus: string = $(this)
          .find("div.MuiCardContent-root div:nth-child(4) dl dd:nth-child(10)")
          .text();
        const date: string = new Date().toLocaleDateString();
        const time: string = new Date().toLocaleTimeString();
        const gpu: GPU = {
          title,
          price,
          img,
          name,
          memorySize,
          coreFrecuency,
          memoryFrecuency,
          bus,
          date,
          time,
        };
        gpuArr.push(gpu);
        gpuModel.create(gpu).catch((error) => {
          res
            .status(500)
            .json({
              code: 4,
              description: "GPU regestry insertion has failed",
            });
        });
      });
      totalDataScrapred = totalDataScrapred + gpuArr.length;
    }
    setTimeout(
      () =>
        db.disconnect().catch((error) => {
          res
            .status(408)
            .json({ code: 2, description: "db disconnection has failed" });
        }),
      1500
    );
    res.status(200).json({
      message: `You have scraped ${totalDataScrapred} GPUs registries`,
    });
  } catch (error) {
    res.status(500).json({ code: 3, description: "Scrapper internal error" });
  }
};
