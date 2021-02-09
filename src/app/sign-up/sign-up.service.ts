import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../authentication/User";

@Injectable()
export class AddUserToTable {
  url: string = "http://localhost:8080/Web4-0.0.1-SNAPSHOT/signUp";
  url2: string = "http://localhost:8080/signUp";
  constructor(private http: HttpClient, private route: Router) {

  }
  addPoint(user: User): Observable<User> {
    console.log("Send ...");
    const headers = new HttpHeaders({Authentication: 'Basic ' + btoa(user.email + ":" + user.username + ":" + user.password)});
    return this.http.post<User>(this.url2, user, {
      headers: headers,
      responseType: "text" as 'json'
    }).pipe();
  }
}
