import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../user/service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SDOuserService {

  API: string = 'http://localhost:8080/v1/sdouser/'

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  create(): Observable<void> {
    return this.http.post<void>(this.API + this.tokenService.getId()?.replace("\"", "")?.replace("\"", ""), null);
  }

}
