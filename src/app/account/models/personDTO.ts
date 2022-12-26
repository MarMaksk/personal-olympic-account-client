import {Passport} from "./passport";

export interface Person {
  id?: number,
  firstName: string,
  secondName: string,
  lastName: string,
  passport: Passport,
  number?: string,
}
