import {faker} from "@faker-js/faker";
import {getRandomDigit} from "./getRandomDigit";

export const addRandomChar = (string: string, locale: string) => {
  faker.locale = locale;

  const randomIndex = faker.mersenne.rand(string.length);
  const fakeWord = faker.name.fullName();

  const randomChar = fakeWord[getRandomDigit(0, fakeWord.length-1)]

  return string.slice(0, randomIndex) + `${randomChar}` + string.slice(randomIndex);
}