import {getRandomDigit} from "./getRandomDigit";

export const isAddError = (prop: any) => {
  const chance = getRandomDigit(0,1);

  return chance ? prop : ''
}