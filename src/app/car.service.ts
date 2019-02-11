import { Injectable } from '@angular/core';
import { Car } from './car';
import { CARS } from './mock-cars';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient, private messageService: MessageService) {
   }
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        tap(_=> this.log('fetched cars')),
        catchError(this.handleError('getCars', []))
    );
  }
  getCar(id: number): Observable<Car>{
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap(_=> this.log(`fetched car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }
  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, httpOptions).pipe(
      tap(_ => this.log(`updated car id=${car.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  addCar (car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, httpOptions).pipe(
      tap((newCar: Car) => this.log(`added Car w/ id=${newCar.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }
  deleteCar (car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.carsUrl}/${id}`;
    
    return this.http.delete<Car>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }
  private log(message: string){
    this.messageService.add(`CarService: ${message}`);
  }
  private carsUrl = 'api/cars'; //url to web api

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); //log to console
      this.log(`${operation} failed: ${error.message}`); //better job of transforming error for user consumption
      return of(result as T); //app running by returning an empty result
    };
  }
}
