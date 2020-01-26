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
  authLevel = 0;
  url = '';
  isImage = true;

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
    this.authLevel = this.userService.getAuthLevel();
    this.url = `https://jssaudo.in/assets/${this.listing.id}.jpg`;
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
      this.updateViewCount();
    });
  }

  updateViewCount(){
    let viewCount = +this.listing.view_count + 1; //Update View Count
    this.mysql.update('listings', {
      userData: {
        view_count: viewCount 
      },
      andWhere: {
        id: this.listing.id
      }
    });
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

  deleteListing(): void {
    this.mysql.delete('listings', {
      andWhere: {
        id: this.listing.id
      }
    }).subscribe(() => {
      this.router.navigate(['home'])
    })
  }

  addPhoto(): void{
    this.router.navigate(['home', this.listing.id]);
  }

  handleNoImage(){
    this.isImage = false;
  }

}
