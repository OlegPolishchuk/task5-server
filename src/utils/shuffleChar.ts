import {faker} from "@faker-js/faker";

export const shuffleChar = (string: string, locale: string) => {
  faker.locale = locale;

  const randomIndex = faker.mersenne.rand(string.length);
  const pairChar = string[randomIndex + 1 < string.length ? randomIndex + 1 : randomIndex - 1]

  return string
    .split('')
    .map(char => {
    return char === string[randomIndex]
      ? pairChar
      : char === pairChar
        ? string[randomIndex]
        : char;
  })
    .join('');
}