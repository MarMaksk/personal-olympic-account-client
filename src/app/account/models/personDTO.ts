import {Passport} from "./passport";

export interface PersonDTO {
  id?: number,
  firstName: string,
  secondName: string,
  lastName: string,
  passport: Passport,
  number?: string,
}
