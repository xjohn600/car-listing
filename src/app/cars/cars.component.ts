import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Observable<Array<Car>>;
  test: any;
  constructor(private carService: CarService) { }

  ngOnInit() {
    // this.carService.getCars()
    // .subscribe(x => alert(JSON.stringify(x)));
    //alert("This has been called");
    this.cars = this.carService.getCars();
  }
  //getCars(): void{
    //this.carService.getCars()
      //.subscribe(cars => this.cars = cars)
 // }

  add(Name: string): void {
    Name = Name.trim();
    var array = Name.split(" ", 3);
    const Year = parseInt(array[0]);
    var Make = array[1];
    var Model = array[2];
    alert(array);
    if (!array) { return; } 
    this.carService.addCar({Year, Make, Model } as Car).subscribe();
  }
  delete(car: Car): void{
    this.carService.deleteCar(car).subscribe();
  }
}
