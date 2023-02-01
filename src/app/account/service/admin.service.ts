import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API: string = 'http://localhost:8080/v1/admin/'

  constructor(private http: HttpClient) {
  }

  infoAboutUsers(): Observable<any> {
    return this.http.get<any>(this.API,
      {
        observe: 'body',
        // @ts-ignore
        responseType: "blob"
      });
  }
}
