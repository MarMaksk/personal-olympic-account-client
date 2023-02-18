import {ICRUD} from "./ICRUD";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Specialization} from "../models/specialization";

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

  delete(uniqueId: any, forced: boolean): Observable<boolean> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",uniqueId);
    queryParams = queryParams.append("forced",forced);
    return this.http.delete<boolean>(this.API, {params: queryParams});
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
