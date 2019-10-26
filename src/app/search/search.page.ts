import { Component, OnInit } from '@angular/core';
import { MySQLService } from '../service/my-sql.service';
import { Listing } from '../interface/listing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  city_id: string;
  title: string;
  cities: Array<any> = [];
  listings: Array<Listing> = [];
  loading = false;

  constructor(private sql: MySQLService, private route: Router) { }

  ngOnInit() {
    this.sql.select('city').subscribe((res: any) => this.cities = res);
  }

  async get() {
    if( this.city_id === '' ){
      return;
    }

    this.loading = true;
    this.sql.select('listings', {
      andWhere: {
        city_id: this.city_id,
        title: ['LIKE', this.title + '%']
      }
    }).subscribe((response: Array<Listing>) => {
      this.loading = false;
      this.listings = response;
    });
  }

  goto(id: number): void{
    this.route.navigate(['/view-listing', id])
  }

}
