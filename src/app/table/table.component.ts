import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Point} from "./Point";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AddPointToTable} from "./table.service";
import {NgForm} from "@angular/forms";
import {error} from "@angular/compiler/src/util";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../authentication/User";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {
  constructor(private AddPoint: AddPointToTable, private http: HttpClient, private route: Router) { }
  items: Array<string> = ["X", "Y", "R", "Time", "Data", "Answer"];
  listOfPoints: Array<Point> = [];
  localStorageList: Array<String> = [];
  valueX: number = 0;
  valueY: number = -5.000;
  valueR: number = 0;
  name: string = "";
  valueForLocalStorage: string = "";
  // coordinatePlane
  @ViewChild('canvas')
  ctx: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  drawCoordinatePlane(): void {
    this.context = this.ctx.nativeElement.getContext('2d');
    this.context.strokeStyle = "black";
    this.context.globalAlpha = 1;
    this.context.lineWidth = 8;
    this.context.beginPath();
    this.context.moveTo(225, 250);
    this.context.lineTo(675, 250);
    this.context.stroke();
    this.context.moveTo(450, 50);
    this.context.lineTo(450, 450);
    this.context.stroke();
    this.context.closePath();
    this.context.beginPath();
    this.context.moveTo(450, 25);
    this.context.lineTo(430, 50);
    this.context.lineTo(470, 50);
    this.context.closePath();

    this.context.lineWidth = 7;
    this.context.strokeStyle = "#56baed";
    this.context.stroke();
    this.context.fillStyle = "#56baed";
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(700, 250);
    this.context.lineTo(675, 230);
    this.context.lineTo(675, 270);
    this.context.closePath();

    this.context.lineWidth = 7;
    this.context.strokeStyle = "#56baed";
    this.context.stroke();
    this.context.fillStyle = "#56baed";
    this.context.fill();

    this.context.lineWidth = 2;
    this.context.font = "20px Arial";
    this.context.strokeText("Y", 480, 50);
    this.context.strokeText("X", 715, 250);

    this.context.lineWidth = 4;
    this.context.beginPath();
    this.context.moveTo(525, 230);
    this.context.lineTo(525, 270);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(600, 230);
    this.context.lineTo(600, 270);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(375, 230);
    this.context.lineTo(375, 270);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(300, 230);
    this.context.lineTo(300, 270);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(430, 325);
    this.context.lineTo(470, 325);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(430, 400);
    this.context.lineTo(470, 400);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(430, 175);
    this.context.lineTo(470, 175);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.moveTo(430, 100);
    this.context.lineTo(470, 100);
    this.context.stroke();
    this.context.closePath();

    this.context.font = "15px Helvetica";
    this.context.lineWidth = 2;
    this.context.strokeText("R / 2", 525, 210);
    this.context.strokeText("R", 600, 210);
    // rectangle
    this.context.beginPath();
    this.context.moveTo(525, 250);
    this.context.lineTo(525, 400);
    this.context.lineTo(450, 400);
    this.context.lineTo(450, 250);
    this.context.lineTo(525, 250);
    this.context.strokeStyle = "black";
    this.context.globalAlpha = 0.2;
    this.context.stroke();
    this.context.fill()
    this.context.closePath();
    // triangle
    this.context.beginPath();
    this.context.moveTo(375, 250);
    this.context.lineTo(450, 400);
    this.context.lineTo(450, 250);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();

    // half-circle
    this.context.beginPath();
    this.context.moveTo(450, 250);
    this.context.arc(450, 250, 75, Math.PI, Math.PI * 3 / 2, false);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
  }
  ngAfterViewInit(): void {
    this.drawCoordinatePlane();
  }

  draw(x:number, y:number, r:number): boolean {
    // console.log("x: " + x + " y: " + y + " r: " + r);
    let color: string = this.check(x, y, r) ? "green" : "red";
    if (r > 0) {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.arc(x, y, 3, 0, 2 * Math.PI, true);
      this.context.globalAlpha = 1;
      this.context.strokeStyle = color;
      this.context.fillStyle = color;
      this.context.stroke();
      this.context.fill();
      this.context.closePath();
      // console.log("drawing");
      return true;
    } else {
      alert("R > 0");
      return false;
    }
  }
  drawPointWithMouse(event): void {
    let x: number = event.layerX;
    let y: number = event.layerY;
    let r: number = this.valueR;
    if (this.draw(x, y, r))
      this.send((x - 450) * (r / 150), (250 - y) * (r / 150), r);
    // draw
  }
  // tryWithLocalStorage
  // initLocalStorage(value: Point): string {
  //   this.valueForLocalStorage = this.valueForLocalStorage
  //     .concat(value.x.toString()).concat(";")
  //     .concat(value.y.toString()).concat(";")
  //     .concat(value.r.toString()).concat(";")
  //     .concat(value.date).concat(";")
  //     .concat(value.time).concat(";")
  //     .concat(value.answer).concat("?");
  //   return this.valueForLocalStorage;
  // }
  send(x, y, r): void {
    let point: Point = new Point();
    point.x = x;
    point.y = y;
    point.r = r;
    point.date = new Date().toString();
    // checkDate
    console.log(point.date);
    this.AddPoint.addPoint(point).subscribe((res: any) => {
        console.log("res:" + res.answer);
        // this.valueForLocalStorage = this.initLocalStorage(res);
        // localStorage.setItem('points',this.valueForLocalStorage);
        // console.log("localStorage " + this.valueForLocalStorage);
        this.listOfPoints.push(res);
        // console.log("listOfPoints:" + this.listOfPoints);
    });

    // if (localStorage.getItem('points') != null) {
    //   this.localStorageList = localStorage.getItem('points').split("?");
    // }
    // this.localStorageList.forEach(value => {
    //   console.log(value + "\n");
    // });
  }
  ngOnInit(): void {
    let url: string = "http://localhost:8080/Web4-0.0.1-SNAPSHOT/table";
    let url2: string = "http://localhost:8080/table";
    console.log(localStorage.getItem('username') + ":" + localStorage.getItem('password'));
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password'))
    });
    // this.http.post('http://localhost:8080/table', null, {headers: headers}).subscribe((event: any) => {
    //   console.log(event);
    // })
    this.name = localStorage.getItem('username');
    this.http.get(url2, {headers,
      params: new HttpParams().set('flag',"0")}).subscribe(
      (data:Point[]) => {
        this.listOfPoints = data;
        data.forEach(value => {
          // this.valueForLocalStorage = this.initLocalStorage(value);
          // localStorage.setItem('points',this.valueForLocalStorage);
          this.draw(value.x / (value.r / 150) + 450, Math.abs(+value.y / (value.r / 150) - 250), value.r);
        });
      }, error => {
        console.log(error.status);
        if (error.status === 401)
          this.route.navigateByUrl("/auth");
        else
          if (error.status === 0) {
            this.route.navigate(['/error']);
          }
      })


  }
  // checkAreaAndSetColor
  check(x, y, r): boolean {

    let x1 = (x - 450) * (r / 150);
    let y1 = (250 - y) * (r / 150);
    // console.log("x: " + x1 + "y: " + y1 + "r: " + r);
    if (x1 >= 0 && x1 <= r / 2 && y1 <= 0 && y1 >= -r)
      return true;
    else if (-2 * x1 - y1 - r <= 0 && x1 <= 0 && y1 <= 0)
      return true;
    else return y1 * y1 + x1 * x1 <= r / 2 * r / 2 && x1 <= 0 && y1 >= 0;
  }
  onSubmit(f:NgForm): void {
    let x:number = f.value.valueX, y:number = f.value.valueY, r:number = f.value.valueR;
    this.send(x, y, r);
    this.draw(x / (r / 150) + 450, Math.abs(y / (r / 150) - 250), r)
  }

  onLogOut(): void {
    localStorage.setItem('username','');
    localStorage.setItem('password', '');
    this.route.navigate(['/auth']);
  }

  clear(): void {
    let url: string = "http://localhost:8080/Web4-0.0.1-SNAPSHOT/table";
    let url2: string = "http://localhost:8080/table";
    this.context.clearRect(0, 0, 900, 500);
    this.drawCoordinatePlane();
    console.log("clear");
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem('username') + ":" + localStorage.getItem('password')),
    });
    this.http.get(url2, {headers,
      params: new HttpParams().set('flag',"1")}).subscribe((data:Point[]) => {
      this.listOfPoints = data;
      data.forEach(value => {
        // this.valueForLocalStorage = this.initLocalStorage(value);
        // localStorage.setItem('points',this.valueForLocalStorage);
        this.draw(value.x / (value.r / 150) + 450, Math.abs(+value.y / (value.r / 150) - 250), value.r);
      });
    }, error => {
      console.log(error.status);
      if (error.status === 401)
        this.route.navigateByUrl("/auth");
      else
      if (error.status === 0) {
        // this.route.navigate(['/error']);
      }
    });
  }



  changeRadiusValueAndRedraw() {
    console.log("change");
    // console.log(this.valueX);
    // console.log(this.valueY);
    let r = this.valueR;
    if (r <= 0)
      alert("Изменение R невозможно, R > 0");
    else {
      this.context.clearRect(0, 0, 900, 500);
      this.drawCoordinatePlane();
      console.log(this.valueR);
      this.listOfPoints.forEach(point => {
        this.draw(point.x / (r / 150) + 450, Math.abs(+point.y / (r / 150) - 250), r);
      })
      console.log(this.listOfPoints);
    }

  }
}
