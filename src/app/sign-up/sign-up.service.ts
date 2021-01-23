import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../authentication/User";

@Injectable()
export class AddUserToTable {
  constructor(private http: HttpClient, private route: Router) {

  }
  addPoint(user: User): Observable<User> {
    console.log("Send ...");
    const headers = new HttpHeaders({Authentication: 'Basic ' + btoa(user.email + ":" + user.username + ":" + user.password)});
    return this.http.post<User>("http://localhost:8080/signUp", user, {
      headers: headers,
      responseType: "text" as 'json'
    }).pipe();
  }
}
