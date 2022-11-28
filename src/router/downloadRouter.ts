import {Router} from "express";
import {userService} from "../domain/userService";
import {downloadService} from "../domain/downloadService";

import fs from "fs";

export const downloadRouter = Router({});

downloadRouter.get('',async (req, res) => {
  const allData = userService.allData;

  console.log(allData)
  const data = await downloadService.convertToCSV(allData);

  const readStream = fs.createReadStream('./data.csv');

  readStream.on('data', (chunk) => {
    res.status(200).send(chunk);
  })

  readStream.on('end', () => {
    fs.unlink('./data.csv', () => {})
  })

})