import {faker} from "@faker-js/faker";
import {User} from "../types";
import {removeRandomChar} from '../utils/removeRandomChar';
import {addRandomChar} from "../utils/addRandomChar";
import {shuffleChar} from "../utils/shuffleChar";
import {getRandomDigit} from "../utils/getRandomDigit";


const permissibleErrors: Array<(string: string, locale: string) => string> = [shuffleChar, removeRandomChar, addRandomChar];
const locales: {[key: string]: string} = {
  'Russia' : 'ru',
  'USA': 'en_US',
  'Ukraine': 'uk',
  'Poland': 'pl',
  'Germany': 'de',
  'Japan': 'ja',
}

export const userService = {

  _data: [] as User[],

  createRandomUser(errorsCount: number, locale: string): User {
    let address = `${faker.address.city()} ${faker.address.streetName()}`;
    let name = faker.name.fullName();
    let phoneNumber = faker.phone.number();

    if (errorsCount > 0) {
      const min = 0;
      const max = errorsCount;
      const permErrorsLength = permissibleErrors.length - 1;

      if (max % Math.floor(max) === 0) {
        for (let i = 0; i < max; i++) {
          const randomIndex = getRandomDigit(0, permErrorsLength);
            name = permissibleErrors[randomIndex](name, locale);
            address = permissibleErrors[randomIndex](address, locale);
            phoneNumber = permissibleErrors[randomIndex](phoneNumber, locale);
        }
      }
      else {
        const max = errorsCount - 0.5;
        const randomIndexForErrorVariant = getRandomDigit(0, permErrorsLength);

        if (max > 0) {
          for (let i = 0; i < max; i++) {
            const randomIndex = getRandomDigit(0, permErrorsLength);
            name = permissibleErrors[randomIndex](name, locale);
            address = permissibleErrors[randomIndex](address, locale);
            phoneNumber = permissibleErrors[randomIndex](phoneNumber, locale);
          }
        }
        else {
          name = getRandomDigit(0,1)
            ? permissibleErrors[randomIndexForErrorVariant](name, locale)
            : name;

          address = getRandomDigit(0,1)
            ? permissibleErrors[randomIndexForErrorVariant](address, locale)
            : address;

          phoneNumber = getRandomDigit(0,1)
            ? permissibleErrors[randomIndexForErrorVariant](phoneNumber, locale)
            : phoneNumber;
        }
      }

    }

    return {
      id: faker.datatype.uuid(),
      name,
      address,
      phoneNumber,
    }
  },

  get allData () {
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

  getUsers(count: number, errorsCount: number, region: string, pageNumber: number) {
    const result: User[] = [];
    const locale = this.getLocale(region);

    for (let i = 0; i < count; i++) {
      result.push(this.createRandomUser(errorsCount, locale))
    }

    if (pageNumber === 0) {
      this.allData = result
    } else {
      this.allData = this.allData.concat(result)
    }

    return result;
  }
}
