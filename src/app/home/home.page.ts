import { Component, OnInit } from '@angular/core';
import { MySQLService } from '../service/my-sql.service';
import { Listing } from '../interface/listing';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  listings: Array<Listing>;
  category_id: string;
  cities: Array<any> = [];
  city_id: string;
  isLoading = false;

  constructor(
    private mysql: MySQLService, 
    public cs: CategoryService,
    private route: Router,
    ) { }

  ngOnInit() {
    this.mysql.select('city',).subscribe((res: any) => {
      console.log('cities', res);
      this.cities = res;
    });
  }

  async get(){
    this.isLoading = true;
    this.listings = [];

    if( this.category_id === null || this.category_id === undefined ){
      this.isLoading = false;
      return;
    } 
    if( this.city_id === null || this.city_id === undefined ){
      this.isLoading = false;
      return;
    }

    
    this.mysql.select('listings', {
      andWhere: {
        category_id: this.category_id,
        city_id: this.city_id
      }
    }).subscribe((res: any) => {
      this.isLoading = false;
      this.listings = res;
    });
  }

  goto(id: number): void{
    this.route.navigate(['/view-listing', id])
  }

}
