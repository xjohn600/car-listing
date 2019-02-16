import { Injectable } from '@angular/core';
import { Car } from './car';
import { Observable, of, forkJoin } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) {
  }
   cars: Observable<Array<Car>>;
   //private httpOptions = {
    //headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //withCredentials: false
  //}; 
   private requestData(): Observable<Array<Car>> {
       return this.http.get('https://localhost:44352/odata/Cars')
                       .pipe(map(data => data['value']));
   }
 
   public getCars(): Observable<Array<Car>> {
     if (!this.cars) {
       this.cars = this.requestData().pipe(shareReplay());
     }
 
     return this.cars;
   }
 
   /**
    * Returns an addresses with the matching identifier
    */
   public getCar(identifier: number): Observable<Car> {
     if (!this.cars) {
       this.cars = this.requestData().pipe(shareReplay());
     }
 
     return this.cars.pipe(map(cars => cars.find(x => x.ID === identifier)));
   }
 
    updateCar(car: Car): Observable<any> {
      var id: "(car.ID)";
    return this.http.put('https://localhost:44352/odata/Cars(' + car.ID + ')', car, httpOptions)
  }
  addCar (car: Car): Observable<Car> {
    const id = Math.floor((Math.random() * 1000) + 1);
    car.ID = id;
    //alert(car.Name);
    alert(car.ID);
    return this.http.post<Car>('https://localhost:44352/odata/Cars', car, httpOptions)
  }

  deleteCar (car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.ID;
    const url = 'https://localhost:44352/odata/Cars(' + id + ')';
    
    return this.http.delete<Car>(url, httpOptions).pipe();
  }
  searchCars (term: string): Observable<Car[]> {
    return this.http.get('https://localhost:44352/odata/cars').pipe(
    mergeMap(term => forkJoin(
      this.searchModel,
      this.searchYear,
      this.searchMake
    )
    ))
    }
  searchModel (term: string): Observable<Car[]> {
    if (!term.trim()) {
      //if not search term, return empty car array
      return of([]);
    }
    return this.http.get(`https://localhost:44352/odata/cars?$filter=contains(Model, '${term}')`)
    .pipe(map(data => data['value']))
  }
  searchYear (term: string): Observable<Car[]> {
    if (!term.trim()) {
      //if not search term, return empty car array
      return of([]);
    }
    return this.http.get(`https://localhost:44352/odata/cars?$filter=contains(Year, '${term}')`)
    .pipe(map(data => data['value']))
  }
  searchMake (term: string): Observable<Car[]> {
    if (!term.trim()) {
      //if not search term, return empty car array
      return of([]);
    }
    return this.http.get(`https://localhost:44352/odata/cars?$filter=contains(Make, '${term}')`)
    .pipe(map(data => data['value']))
  }
  // private log(message: string){
  //   this.messageService.add(`CarService: ${message}`);
  // }
}
//   private carsUrl = 'api/cars'; //url to web api

//   /**
//  * Handle Http operation that failed.
//  * Let the app continue.
//  * @param operation - name of the operation that failed
//  * @param result - optional value to return as the observable result
//  */
// /*
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//       // TODO: send the error to remote logging infrastructure
//       console.error(error); //log to console
//       this.log(`${operation} failed: ${error.message}`); //better job of transforming error for user consumption
//       return of(result as T); //app running by returning an empty result
//     };
//   }*/
