export type User = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
}


export type DataQueryParams = {
  region: string;
  errorsCount: number;
  seed: number;
  pageNumber: number;
  isFirst: string;
}