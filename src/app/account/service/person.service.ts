import {ICRUD} from "./ICRUD";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../models/participant";
import {PersonDTO} from "../models/personDTO";
import {Address} from "../models/address";

@Injectable({
  providedIn: 'root'
})
export class PersonService implements ICRUD<PersonDTO> {

  API: string = 'http://localhost:8080/v1/person/'

  constructor(private http: HttpClient) {
  }

  create(entity: PersonDTO): Observable<PersonDTO> {
    return this.http.post<PersonDTO>(this.API, entity);
  }

  delete(uniqueId: any): Observable<void> {
    return this.http.delete<void>(uniqueId);
  }

  find(uniqueId: any): Observable<PersonDTO> {
    return this.http.get<PersonDTO>(this.API + uniqueId);
  }

  update(entity: PersonDTO): Observable<PersonDTO> {
    return this.http.put<PersonDTO>(this.API, entity);
  }

}
