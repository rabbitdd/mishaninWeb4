import {Component, Injectable, OnInit} from '@angular/core';
import {AddUserToTable} from "./sign-up.service";
import {User} from "../authentication/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(private AddUserToTable: AddUserToTable, private route: Router) { }

  ngOnInit(): void {
  }

  submit(email, username, password) {
    console.log(email);
    console.log(username);
    let alpha: string = "0123456789qwertyuiopasdfghjklzxcvbnmйцукенгшщзхъфывапролджэячсмитьбюё";
    let alpha2: string = "0123456789qwertyuiopasdfghjklzxcvbnm@";
    let role: string = "USER";
    let active: number = 1;
    let flag: boolean = true;
    username = username.toLowerCase();
    email = email.toLowerCase();
    for (let i = 0; i < username.length; i++) {
      console.log(username[i]);
      console.log(alpha.indexOf(username[i]));
      if (alpha.indexOf(username[i]) === -1) {
        console.log(username[i]);
        flag = false;
      }
    }
    for (let i = 0; i < email.length; i++) {
      if (alpha2.indexOf(email[i]) === -1) {
        console.log(email[i]);
        flag = false;
      }
    }
    if (flag) {
      let user: User = {email, username, password, role, active}
      console.log(user);
      this.AddUserToTable.addPoint(user).subscribe((res: any) => {
        console.log(res);
        if (res === "notAdd") {
          alert("Пользователь с таким именем уже существует !")
        } else {
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          this.route.navigateByUrl("/table");
        }
      }, error => {
        console.log(error);
        console.log(error.status);
        console.log(email + username + password);
        if (error.status === 0) {
          this.route.navigate(['/error'])
        }
      })
    } else {
      alert("Проверьте login или email !");
    }
  }
}
