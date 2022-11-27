export type User = {
  id: string;
  name: string,
  address: {
    country: string;
    city: string;
    street: string;
    zipCode: string;
    timeZone: string;
  },
  phoneNumber: string;
}


export type DataQueryParams = {
  currentRegion: {
    title: string;
    locale: string;
  };
  errorCount: number;
  seed: number;
  pageNumber: number;
}