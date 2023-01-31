import {Injectable} from '@angular/core';
import {User} from "../models/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ROLES = 'auth-roles';
const USER_ID = 'user-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveId(id: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, JSON.stringify(id));
  }

  public getId(): string | null {
    return sessionStorage.getItem(USER_ID);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoles(roles: string[]): void {
    window.sessionStorage.removeItem(USER_ROLES);
    window.sessionStorage.setItem(USER_ROLES, JSON.stringify(roles));
  }

  public getUser(): String {
    return JSON.parse(<string>sessionStorage.getItem(USER_KEY));
  }

  public getRoles(): string[] {
    return JSON.parse(<any>sessionStorage.getItem(USER_ROLES));
  }

  logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
