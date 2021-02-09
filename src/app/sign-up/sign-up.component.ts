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
    let role: string = "USER";
    let active: number = 1;
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
      console.log(error.status);
      if (error.status === 0) {
          this.route.navigate(['/error'])
      }
    })
  }
}
