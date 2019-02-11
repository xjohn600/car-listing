import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }
  getCars(): void{
    this.carService.getCars()
      .subscribe(cars => this.cars = cars);
  }
  add(model: string): void {
    model = model.trim();
    if (!model) { return; }
    this.carService.addCar({ model } as Car)
      .subscribe(car => {
        this.cars.push(car);
      });
  }
  delete(car: Car): void{
    this.cars = this.cars.filter(c => c != car);
    this.carService.deleteCar(car).subscribe();
  }
}
