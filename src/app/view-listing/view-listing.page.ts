import { Component, OnInit } from '@angular/core';
import { MySQLService } from '../service/my-sql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../interface/listing';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.page.html',
  styleUrls: ['./view-listing.page.scss'],
})
export class ViewListingPage implements OnInit {
  listing: Listing = {
    id: 0,
    title: '',
    address: '',
    city_id: 1,
    category_id: 1
  };
  savedPhones: Array<string> = [];

  constructor(
    private mysql: MySQLService, 
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.listing.id = res['listing_id'];
      this.getListing();
    });
  }

  editListing() {
    if( this.userService.getAuthLevel() <= 1 ){
      return;
    } else {
      this.router.navigate(['new-listing-form', {id: this.listing.id}])
    }
  }

  getListing(): void {
    this.mysql.select('listings', {
      andWhere: {
        id: this.listing.id
      }
    }).subscribe((res: any) => {
      this.listing = res[0];
      this.getPhone();
    })
  }

  getPhone(): void {
    this.savedPhones = [];
    this.mysql.select('phone', {
      andWhere: {
        listing_id: this.listing.id
      }
    }).subscribe((res: any) => {
      Array.from(res).forEach((item: any) => {
        this.savedPhones.push(item.contact);
      })
    });
  }

}
