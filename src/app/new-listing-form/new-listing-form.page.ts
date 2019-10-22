import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { MySQLService } from '../service/my-sql.service';
import { Listing } from './../interface/listing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-listing-form',
  templateUrl: './new-listing-form.page.html',
  styleUrls: ['./new-listing-form.page.scss'],
})
export class NewListingFormPage implements OnInit {
  loading = false; 
  title = "New Listing";
  cities: Array<any> = [];

  listing: Listing= {
    id: 0,
    title: '',
    address: '',
    city_id: 1,
    category_id: 1
  };
  constructor(
    public cs: CategoryService, 
    private msql: MySQLService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.msql.select('city',).subscribe((res: any) => this.cities = res );
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listing.id = +params.get('id') ? +params.get('id') : null;
      this.title = this.listing.id ? 'Update Listing' : 'New Listing'
      this.get();
    })
  }

  async save(){
    this.loading = true;
    await this.msql.insert('listings', {
      userData:{
        title: this.listing.title,
        address: this.listing.address,
        city_id: this.listing.city_id,
        category_id: this.listing.category_id
      }
    }, true).subscribe((res:any )=>{
      this.loading = false;
      this.router.navigate(['/add-phone', res.lastInsertId ]);
    });
  }

  reset(): void {
    this.listing = {
      id: 0,
      title: '',
      address: '',
      city_id: 1,
      category_id: 1
    };
  }

  async get() {
    if( this.listing.id === null ) return;

    this.loading = true;
    await this.msql.select('listings', {
      andWhere: {id: this.listing.id}
    }).subscribe((res: any) => {
      this.listing = res[0];
      this.loading = false;
    });
  }

  async update() {
    this.loading = true; 
    await this.msql.update('listings', {
      andWhere: {id: this.listing.id },
      userData:{
        title: this.listing.title,
        address: this.listing.address,
        city_id: this.listing.city_id,
        category_id: this.listing.category_id
      }
    }).subscribe( () => {
      this.loading = false;
      this.router.navigate(['/add-phone', this.listing.id ]);
    } );
  }

}
