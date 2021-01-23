import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "./User";
import {Point} from "../table/Point";
import {Route} from "@angular/router";

@Injectable()
export class Authentication {
  url: string = "http://localhost:8080/auth";
  constructor(private http: HttpClient) {
  }
  addUser(user: User): Observable<User>{
    console.log(user);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user.username + ":" + user.password)
    })
    return this.http.post<User>("http://localhost:8080/auth", user, {
      headers: headers,
      responseType: "text" as 'json'

      }
    ).pipe();
  }

}
