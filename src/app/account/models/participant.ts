import {PersonDTO} from "./personDTO";
import {Address} from "./address";
import {Specialization} from "./specialization";

export interface Participant {
  id?: string;
  person: PersonDTO;
  birthday: Date;
  address: Address;
  email: string;
  educationalInstitution: string;
  registered: boolean;
  legalRepresentative?: PersonDTO;
  specializations?: Specialization[];
}
