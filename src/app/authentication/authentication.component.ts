import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import {HttpClient, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Authentication } from './authentication.service';
import {User} from "./User";
import {Router} from "@angular/router";
import {TableComponent} from "../table/table.component";
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

  constructor(private AuthenticationService: Authentication, private route: Router) { }

  ngOnInit(): void {
  }
  submit(username, password) {
      let email: string = "thelordstig@gmail.com";
      let role: string = "USER";
      let active: number = 1;
      username = username.toLowerCase();
      const newUser: User = {email, username, password, role, active};
      console.log(newUser);
      this.AuthenticationService
        .addUser(newUser)
        .subscribe((res: any) => {
          console.log(res);
          if (res === "false") {
            alert("Вы не зарегистрированны");
            this.route.navigateByUrl("/signUp");
          } else if (res === "incorrectPassword") {
            alert("Неверный пароль");
          } else if (res === "true") {
            localStorage.setItem('username', newUser.username);
            localStorage.setItem('password', newUser.password);
            this.route.navigate(['/table']);
          }
        }, error => {
          console.log(error.status);
          if (error.status === 401) {
            alert("Неверный пароль или логин / Вы не зарегистрированы");
          }
          if (error.status === 0) {
            this.route.navigate(['/error'])
          }
        });
  }
  onSignUp(): void {
    this.route.navigateByUrl("/signUp");
  }

  validationAndSend(username, password): void {
    if (username === '' || password === '') {
      window.alert("Введите логин / пароль");
      console.log("incorrect");
    } else {
      this.submit(username, password);
    }
  }
}
