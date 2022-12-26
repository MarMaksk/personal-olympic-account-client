import {ICRUD} from "./ICRUD";
import {Address} from "../models/address";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddressService implements ICRUD<Address> {

  API: string = 'http://localhost:8080/v1/address/'

  constructor(private http: HttpClient) {
  }

  create(entity: Address): Observable<Address> {
    return this.http.post<Address>(this.API, entity);
  }

  delete(uniqueId: any): Observable<void> {
    return this.http.delete<void>(uniqueId);
  }

  find(uniqueId: any): Observable<Address> {
    return this.http.get<Address>(this.API + uniqueId);
  }

  update(entity: Address): Observable<Address> {
    return this.http.put<Address>(this.API, entity);
  }
}
