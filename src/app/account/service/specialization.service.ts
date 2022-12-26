import {ICRUD} from "./ICRUD";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../models/participant";
import {Specialization} from "../models/specialization";
import {Address} from "../models/address";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService implements ICRUD<Specialization> {

  API: string = 'http://localhost:8080/v1/specialization/'

  constructor(private http: HttpClient) {
  }

  create(entity: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(this.API, entity);
  }

  delete(uniqueId: any): Observable<void> {
    return this.http.delete<void>(uniqueId);
  }

  findAll(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.API);
  }

  find(uniqueId: any): Observable<Specialization> {
    return this.http.get<Specialization>(this.API + uniqueId);
  }

  update(entity: Specialization): Observable<Specialization> {
    return this.http.put<Specialization>(this.API, entity);
  }

}
