import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "./User";
import {Point} from "../table/Point";
import {Route} from "@angular/router";

@Injectable()
export class Authentication {
  url: string = "http://localhost:8080/Web4-0.0.1-SNAPSHOT/auth";
  url2: string = "http://localhost:8080/auth";
  constructor(private http: HttpClient) {
  }
  addUser(user: User): Observable<User>{
    console.log(user);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user.username + ":" + user.password)
    })
    return this.http.post<User>(this.url2, user, {
      headers: headers,
      responseType: "text" as 'json'

      }
    ).pipe();
  }

}
