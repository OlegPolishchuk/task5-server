import {Router} from "express";
import fs from 'fs';
import {userService} from "../domain/userService";
import {downloadService} from "../domain/downloadService";

export const downloadRouter = Router({});

downloadRouter.get('',async (req, res) => {
  console.log('download router')
  const allData = userService.allData;

  await downloadService.convertToCSV(allData);

  fs.readFile('./data.csv', (err, data) => {
    if (err) {

      return res.status(404)
    }
    else {
      console.log(data.toString())
      res.status(200).send(data)
    }
  })

})