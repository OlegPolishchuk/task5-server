import {faker} from "@faker-js/faker";
import {User} from "../types";
import {removeRandomChar} from '../utils/removeRandomChar';
import {addRandomChar} from "../utils/addRandomChar";
import {shuffleChar} from "../utils/shuffleChar";
import {getRandomDigit} from "../utils/getRandomDigit";
import {create} from "domain";


const permissibleErrors: Array<(string: string, locale: string) => string> = [shuffleChar, removeRandomChar, addRandomChar];
const locales: { [key: string]: string } = {
  'Russia': 'ru',
  'USA': 'en_US',
  'Ukraine': 'uk',
  'Poland': 'pl',
  'Germany': 'de',
  'Japan': 'ja',
}

export const userService = {

  _data: [] as User[],
  _seed: null as null | number,

  createRandomUser(): User {

    return {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      address: `${faker.address.city()} ${faker.address.streetName()}`,
      phoneNumber: faker.phone.number(),
    }
  },

  getDataWithErrors(errorsCount: number, region: string) {
    if (errorsCount === 0) return this.allData;

    const locale = this.getLocale(region);

    const allData = JSON.parse(JSON.stringify(this.allData));
    const length = allData.length;

    for (let i = 0; i < length; i++) {

      if (errorsCount > 0) {
        const min = 0;
        const max = errorsCount;
        const permErrorsLength = permissibleErrors.length - 1;

        if (max % Math.floor(max) === 0) {
          for (let j = 0; j < max; j++) {
            const randomIndex = getRandomDigit(0, permErrorsLength);
            allData[i].name = permissibleErrors[randomIndex](allData[i].name, locale);
            allData[i].address = permissibleErrors[randomIndex](allData[i].address, locale);
            allData[i].phoneNumber = permissibleErrors[randomIndex](allData[i].phoneNumber, locale);
          }
        } else {
          const max = errorsCount - 0.5;
          const randomIndexForErrorVariant = getRandomDigit(0, permErrorsLength);

          if (max > 0) {
            for (let j = 0; j < max; j++) {
              const randomIndex = getRandomDigit(0, permErrorsLength);
              allData[i].name = permissibleErrors[randomIndex](allData[i].name, locale);
              allData[i].address = permissibleErrors[randomIndex](allData[i].address, locale);
              allData[i].phoneNumber = permissibleErrors[randomIndex](allData[i].phoneNumber, locale);
            }
          } else {
            allData[i].name = getRandomDigit(0, 1)
              ? permissibleErrors[randomIndexForErrorVariant](allData[i].name, locale)
              : allData[i].name;

            allData[i].address = getRandomDigit(0, 1)
              ? permissibleErrors[randomIndexForErrorVariant](allData[i].address, locale)
              : allData[i].address;

            allData[i].phoneNumber = getRandomDigit(0, 1)
              ? permissibleErrors[randomIndexForErrorVariant](allData[i].phoneNumber, locale)
              : allData[i].phoneNumber;
          }
        }

      }

    }

    return allData;
  },

  get allData() {
    return this._data
  },

  set allData(data) {
    this._data = data;
  },

  setLocale(locale: string = 'USA') {
    faker.locale = (locales[locale]);
  },

  getLocale(region: string) {
    return locales[region];
  },

  setSeed(seed: number) {
    faker.seed(seed);
  },

  generateUsers(errorsCount: number, region: string, pageNumber: number, isFirst: string, seed: number) {
    if(isFirst === 'true'){
      this.allData = [] as User[];
      this._seed = Number(seed)
    }

    console.log(`real seed = ${Number(seed) + Number(pageNumber)}`)
    console.log(`this.seed`, this._seed)

    this.setSeed(Number(seed) + Number(pageNumber))

    const locale = this.getLocale(region);
    const allDataLength = this.allData.length;
    console.log(`allDataLength(${allDataLength}) === pageNumber(${pageNumber}) * 10 + 20  === 0  => ${allDataLength === Number(pageNumber) * 10 + 20}` )
    let count = Number(pageNumber) === 0
      ? 20
      : allDataLength === Number(pageNumber) * 10 + 20
        ? 0
        : 10

    let startSeed = Number(seed);

    if (this._seed !== Number(seed) + Number(pageNumber)) {
      if (isFirst === 'true') {
        this.setSeed(startSeed + Number(pageNumber))
        count = 10;
      }
      else {
        count = allDataLength === 0 ? 20 : allDataLength
        this.setSeed(startSeed)
      }
    }


    const result: User[] = [];


    for (let i = 0; i < count; i++) {
      if (count >= 30) {

       if (i >= 20) {
        if ( i % 10 === 0) {
          startSeed += 1;
          this.setSeed(startSeed)
        }
       }
      }

      result.push(this.createRandomUser())
    }

    if (isFirst === 'true') {
      this.allData = result
    } else {
      if (this._seed !== Number(seed) + Number(pageNumber) ) {
        this.allData = result
      }
      else {
        this.allData = Number(pageNumber) === 0 ? result : this.allData.concat(result)
      }
    }

    this._seed = Number(seed) + Number(pageNumber) + 1;

    return this.getDataWithErrors(errorsCount, region)
  }
}
