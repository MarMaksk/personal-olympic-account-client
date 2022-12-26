import {Person} from "./Person";
import {Address} from "./Address";
import {Specialization} from "./Specialization";

export interface Participant {
  id: string;
  person: Person;
  birthday: Date;
  address: Address;
  email: string;
  educationalInstitution: string;
  legalRepresentative: Person;
  specializations: Specialization[];
}
