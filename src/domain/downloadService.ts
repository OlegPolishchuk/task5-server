import {User} from "../types";
import ObjectsToCsv from "objects-to-csv";

export const downloadService = {
  convertToCSV(data: User[]) {
    (async ()=>{
      try {
        const csv = new ObjectsToCsv(data);

        await csv.toDisk('./data.csv');

        console.log(await csv.toString())
      }
      catch (e) {
        console.log(e)
      }
    })()
  },
}