import { Component, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, map
} from 'rxjs/operators';
import { Car } from '../car';
import { CarService } from '../car.service';
@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {
  cars$: Observable<Array<Car>>;
  carsfiltered: Observable<Array<Car>>;
  private searchTerms = new Subject<string>();

  constructor(private carService: CarService) { }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cars$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering term
      debounceTime(300),
      //ignore new term if same as prev term
      distinctUntilChanged(),
      //switch to new search observable each time the term changes
      switchMap((term: string) => 
      this.carService.searchCars(term))
    );
    // this.searchTerms.pipe(debounceTime(300), distinctUntilChanged(), switchMap((term:string) => this.carService.searchCars(term)))
    // .subscribe(car => {
    //   this.cars$ = car;});

  }

}
