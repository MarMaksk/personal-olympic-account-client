import {ICRUD} from "./ICRUD";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../models/participant";
import {PersonDTO} from "../models/personDTO";
import {TokenStorageService} from "../../user/service/token-storage.service";
import {Specialization} from "../models/specialization";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService implements ICRUD<Participant> {

  API: string = 'http://localhost:8080/v1/participant/'

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  create(entity: Participant): Observable<string> {
    return this.http.post<string>(this.API, entity);
  }

  addLegalRepresentative(entity: PersonDTO): Observable<PersonDTO> {
    return this.http.put<PersonDTO>(this.API + "representative/" + this.tokenService.getId()?.replace("\"", "")?.replace("\"", ""), entity);
  }

  updateLegalRepresentative(entity: PersonDTO): Observable<PersonDTO> {
    return this.http.put<PersonDTO>(this.API + "representative/update/" + this.tokenService.getId()?.replace("\"", "")?.replace("\"", ""), entity);
  }

  delete(uniqueId: any): Observable<void> {
    return this.http.delete<void>(this.API + uniqueId);
  }

  find(uniqueId: any): Observable<Participant> {
    return this.http.get<Participant>(this.API + uniqueId);
  }

  update(entity: Participant): Observable<Participant> {
    return this.http.put<Participant>(this.API, entity);
  }

  addSpecializations(arr: Specialization[]): Observable<any> {
    return this.http.put<any>(this.API + "specializations/" + this.tokenService.getId()?.replace("\"", "")?.replace("\"", ""), arr);
  }
}
