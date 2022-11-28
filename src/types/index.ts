export type User = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
}


export type DataQueryParams = {
  region: string;
  errorCount: number;
  seed: number;
  pageNumber: number;
}