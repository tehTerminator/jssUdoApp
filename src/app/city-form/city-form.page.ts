import { Component, OnInit } from '@angular/core';
import { MySQLService } from '../service/my-sql.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.page.html',
  styleUrls: ['./city-form.page.scss'],
})
export class CityFormPage implements OnInit {
  cities: Array<string> = [];

  constructor(private mysql: MySQLService) { }

  ngOnInit() { }

  getCities(): void {
    this.mysql.select('city').subscribe((res)=>this.cities = res);
  }

}
