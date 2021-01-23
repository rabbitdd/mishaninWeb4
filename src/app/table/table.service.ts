import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {Point} from "./Point";
import {User} from "../authentication/User";

@Injectable()
export class AddPointToTable {
  constructor(private http: HttpClient) {

  }
  addPoint(point: Point): Observable<Point> {
    console.log("Send ...")
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password'))});
    return this.http.post<Point>("http://localhost:8080/table", point, {
      headers: headers,
    })
      .pipe();
  }

  postRequest(){

  }
}
