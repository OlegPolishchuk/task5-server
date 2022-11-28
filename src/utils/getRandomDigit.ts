import {faker} from "@faker-js/faker";

export const getRandomDigit = (min: number, max: number) => {

  return faker.datatype.number({min, max})
}