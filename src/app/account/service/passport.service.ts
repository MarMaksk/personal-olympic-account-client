import {ICRUD} from "./ICRUD";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Passport} from "../models/passport";

@Injectable({
  providedIn: 'root'
})
export class PassportService implements ICRUD<Passport> {

  API: string = 'http://localhost:8080/v1/passport/'

  constructor(private http: HttpClient) {
  }

  create(entity: Passport, email: string): Observable<Passport> {
    return this.http.post<Passport>(this.API + email, entity);
  }

  delete(uniqueId: any): Observable<void> {
    return this.http.delete<void>(uniqueId);
  }

  find(uniqueId: any): Observable<Passport> {
    return this.http.get<Passport>(this.API + uniqueId);
  }

  update(entity: Passport): Observable<Passport> {
    return this.http.put<Passport>(this.API, entity);
  }

}
