import {faker } from "@faker-js/faker";
import {User} from "../types";

// export const userService = (locale: string) => {
//   faker.setLocale(locale)
//
//   const data: User[] = [];
//
//   for (let i = 0; i < 5; i++) {
//     console.log(locale)
//     // console.log(faker.address.country())
//     console.log(faker.address.city())
//     console.log(faker.name.firstName())
//
//     const user = {
//       id: faker.datatype.uuid(),
//       name: {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//       },
//       address: {
//         country: faker.address.country(),
//         city: faker.address.city(),
//         street: faker.address.street(),
//         timeZone: faker.address.timeZone(),
//         zipCode: faker.address.timeZone(),
//       },
//       phoneNumber: faker.phone.number(),
//     }
//   console.log(user)
//     data.push(user)
//   }
//   return data;
// }


faker.locale = ('ru')
console.log(faker.name.fullName(), faker.name.firstName(), faker.address.state(), faker.address.city())
console.log(faker.name.fullName(), faker.name.firstName(), faker.address.state(), faker.address.city())
console.log(faker.name.fullName(), faker.name.firstName(), faker.address.state(), faker.address.city())
console.log(faker.name.fullName(), faker.name.firstName(), faker.address.state(), faker.address.city())
console.log(faker.name.fullName(), faker.name.firstName(), faker.address.state(), faker.address.city())

// faker.locale = ('de')
// console.log(faker.name.fullName(), faker.address.state(), faker.address.city())
//
// faker.locale = ('fr')
// console.log(faker.name.fullName(), faker.address.state(), faker.address.city())


// faker.locale = ('ru');
// for (let i = 0; i < 10; i++) {
//   console.log(`${faker.name.firstName()} ${faker.name.lastName()} ${faker.address.country()} ${faker.address.city()}`)
//   console.log(' //////////////')
// }

// export const userService = (locale: string, itemsCount: number) => {
//   // faker.locale = ('ru')
//   faker.setLocale('ru')
//   const result = [];
//
//   for (let i = 0; i < itemsCount; i++) {
//     result.push({
//         id: faker.datatype.uuid(),
//         name: {
//           firstName: faker.name.firstName(),
//           lastName: faker.name.lastName(),
//         },
//         address: {
//           country: faker.address.country(),
//           city: faker.address.city(),
//           street: faker.address.street(),
//           timeZone: faker.address.timeZone(),
//           zipCode: faker.address.timeZone(),
//         },
//         phoneNumber: faker.phone.number(),
//       }
//     )
//   }
//
//   return result
// }


export const userService = {

  createRandomUser: (): User => {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      address: {
        country: faker.address.country(),
        city: faker.address.city(),
        street: faker.address.street(),
        timeZone: faker.address.timeZone(),
        zipCode: faker.address.timeZone(),
      },
      phoneNumber: faker.phone.number(),
    }
  },

  setLocale: (locale: string) => {
    console.log(locale)
    faker.locale = (`${locale}`);
  },

  setSeed: (seed: number) => {
    faker.seed(seed);
  },

  getUsers: (count: number, locale: string) => {
    faker.locale = locale;
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(userService.createRandomUser())
    }

    return result;
  }
}