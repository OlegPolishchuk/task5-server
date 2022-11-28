import {User} from "../types";
import ObjectsToCsv from "objects-to-csv";

export const downloadService = {
  convertToCSV(data: User[]) {
    return (async () => {
      const csv = new ObjectsToCsv(data);
      return await csv.toDisk('./data.csv', {bom: true, append: true})
    })()

  },

  getCSVString(data: User[]) {
    const csv = new ObjectsToCsv(data);

    return csv.toString();
  },
}