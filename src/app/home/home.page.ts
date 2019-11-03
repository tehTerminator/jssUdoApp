import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MySQLService } from '../service/my-sql.service';
import { Listing } from '../interface/listing';
import { Router } from '@angular/router';
import { Category } from '../interface/category';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  listings: Array<Listing> = [];
  category_id: string;
  cities: Array<any> = [];
  city_id: string;
  isLoading = false;
  limit = {
    start: 0,
    offset: 10,
    max: -1
  };
  categories: Array<Category> = [];

  constructor(
    private mysql: MySQLService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.mysql.select('city').subscribe((res: any) => {
      this.isLoading = false;
      this.cities = res
    });

    this.isLoading = true;
    this.mysql
      .select('categories', { orderBy: 'title ASC' })
      .subscribe((res: Array<Category>) => {
        this.isLoading = false;
        this.categories = res;
      });
  }

  async get() {
    this.isLoading = true;
    this.listings = [];

    if (this.category_id === null || this.category_id === undefined) {
      this.isLoading = false;
      return;
    }
    if (this.city_id === null || this.city_id === undefined) {
      this.isLoading = false;
      return;
    }

    this.mysql.select('listings', {
      andWhere: {
        category_id: this.category_id,
        city_id: this.city_id
      },
      limit: `${this.limit.start}, ${this.limit.offset}`
    }).subscribe((res: any) => {
      this.isLoading = false;
      this.listings = res;
    });
  }

  goto(id: number): void {
    this.route.navigate(['/view-listing', id])
  }

  async getCount() {
    if (this.category_id === null || this.category_id === undefined) {
      this.isLoading = false;
      return;
    }
    if (this.city_id === null || this.city_id === undefined) {
      this.isLoading = false;
      return;
    }


    this.isLoading = true;
    this.mysql.select('listings', {
      columns: ['COUNT(id) as max'],
      andWhere: {
        category_id: this.category_id,
        city_id: this.city_id
      }
    }).subscribe((res: any) => {
      this.isLoading = false;
      this.limit.max = +res[0].max;
      this.get();
    })
  }

  next() {
    if (this.listings.length === 0) {
      return;
    }
    this.limit.start += this.limit.offset;
    if (this.limit.start > this.limit.max) {
      this.limit.start = 0;
    }
    this.get();
  }

}
