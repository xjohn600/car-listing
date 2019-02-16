import { Component, OnInit, Input } from '@angular/core';
import { Car } from '../car';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { CarService } from '../car.service';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @Input() car: Car;

  constructor(private route: ActivatedRoute, private carService: CarService, private location: Location) { }

  ngOnInit(): void {
    this.getCar();
    //const id = +this.route.snapshot.paramMap.get('ID');
    // this.car = this.carService.getCar(id)
  }
  getCar(): void{
    const id = +this.route.snapshot.paramMap.get('ID');
    this.carService.getCar(id)
    .subscribe(car => this.car = car);
    //alert(id);
    //alert(this.car.Name);
}
goBack(): void{
  this.location.back();
}

save(): void{
  this.carService.updateCar(this.car)
    .subscribe(() => this.goBack());
}
}
