import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MainComponent} from "./main/main.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {TableComponent} from "./table/table.component";
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: "/main", pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'table', component: TableComponent},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
