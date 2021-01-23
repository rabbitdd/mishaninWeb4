import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import {ButtonModule} from 'primeng/button';
import { AuthenticationComponent } from './authentication/authentication.component';
import {Authentication} from "./authentication/authentication.service";
import { SignUpComponent } from './sign-up/sign-up.component';
import { TableComponent } from './table/table.component';
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {SliderModule} from "primeng/slider";
import {AddPointToTable} from "./table/table.service";
import { ReactiveFormsModule } from '@angular/forms';
import {AddUserToTable} from "./sign-up/sign-up.service";
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    AuthenticationComponent,
    SignUpComponent,
    TableComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    SliderModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    CalendarModule,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule
  ],
  providers: [Authentication, AddPointToTable, AddUserToTable],
  bootstrap: [AppComponent]
})
export class AppModule { }
