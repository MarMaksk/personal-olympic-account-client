import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const USER_API = 'http://localhost:8080/olymp/user/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any>{
    let params = new HttpParams()
    params = params.append('id', id)
    return this.http.get(USER_API, {
      params
    });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API)
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(USER_API + 'update', user)
  }

}
