import {ICRUD} from "./ICRUD";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../models/participant";
import {PersonDTO} from "../models/personDTO";
import {TokenStorageService} from "../../user/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService implements ICRUD<Participant> {

  API: string = 'http://localhost:8080/v1/participant/'

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  create(entity: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.API, entity);
  }

  addLegalRepresentative(entity: PersonDTO): Observable<PersonDTO> {
    console.log(this.tokenService.getEmail())
    console.log(entity)
    return this.http.post<PersonDTO>(this.API + this.tokenService.getEmail()?.replace("\"", "")?.replace("\"", ""), entity);
  }

  delete(uniqueId: any): Observable<void> {
    return this.http.delete<void>(uniqueId);
  }

  find(uniqueId: any): Observable<Participant> {
    return this.http.get<Participant>(this.API + uniqueId);
  }

  update(entity: Participant): Observable<Participant> {
    return this.http.put<Participant>(this.API, entity);
  }

}
