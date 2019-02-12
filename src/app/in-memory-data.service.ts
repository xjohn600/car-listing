import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const cars = [
      {id: 1, name: "2009 Honda Civic"},
      {id: 2, name: "2010 Toyota Corolla"},
      {id: 3, name: "2015 Infiniti Q50"},
      {id: 4, name: "2017 Lexus IS350"},
      {id: 5, name: "2019 Toyota Supra"}
    ];
  return {cars};
  }
  genId(cars: Car[]): number {
    return cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 11;
  }
}