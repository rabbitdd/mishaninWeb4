import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goAuth() {
    console.log("click");
    this.router.navigate(['auth']);
  }
  goSignUp() {
    console.log("click_2");
    this.router.navigate(['signUp']);
  }


}
