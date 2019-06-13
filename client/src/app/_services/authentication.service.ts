import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { User } from "../_models/user";
import { SnackBarService } from "./snack-bar.service";
import * as jwt_decode from "jwt-decode";
import { Role } from "../_models/role";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: SnackBarService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`http://localhost:3000/auth/login`, { email, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            const decodedToken = this.getDecodedAccessToken(user.token);
            const userToSave = {
              id: decodedToken._id,
              name: decodedToken.nick,
              email: decodedToken.email,
              role: decodedToken.isAdmin ? Role.Admin : Role.User,
              token: user.token
            };

            localStorage.setItem("currentUser", JSON.stringify(userToSave));
            this.currentUserSubject.next(userToSave);
          }

          return user;
        })
      );
  }

  register(nick: string, email: string, password: string) {
    return this.http
      .post<any>("http://localhost:3000/auth/register", {
        nick,
        email,
        password
      })
      .pipe(map(response => response));
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
    this.snackBar.log("Wylogowano pomyślnie!");
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
