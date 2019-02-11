import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const cars = [
      {id: 1, year: 2009, make: "Honda", model: "Civic", status: "Clean"},
      {id: 2, year: 2010, make: "Toyota", model: "Corolla", status: "Rebuilt"},
      {id: 3, year: 2011, make: "Infiniti", model: "Q50", status: "Clean"}
    ];
  return {cars};
  }
  genId(cars: Car[]): number {
    return cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 11;
  }
}