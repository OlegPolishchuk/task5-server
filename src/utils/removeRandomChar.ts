import {faker} from "@faker-js/faker";

export const removeRandomChar = (string: string, locale: string) => {
  faker.locale = locale;

  const randomIndex = faker.mersenne.rand(string.length);

  return string.slice(0, randomIndex).concat(string.slice(randomIndex + 1))
}

