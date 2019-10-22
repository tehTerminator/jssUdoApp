import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MySQLService } from '../service/my-sql.service';
import { Listing } from './../interface/listing';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.page.html',
  styleUrls: ['./add-phone.page.scss'],
})
export class AddPhonePage implements OnInit {
  listing: Listing = {
    id: 0,
    title: '',
    address: '',
    city_id: 1,
    category_id: 1
  };
  phoneNumber = '';
  savedPhones: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    private mysql: MySQLService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.listing.id = res['listing_id'];
      this.getListing(+this.listing.id);
      this.showPhone();
    });
  }

  getListing(listing_id: number): void {
    this.mysql.select('listings', {
      andWhere: {
        id: listing_id
      }
    }).subscribe((res: any) => {
      this.listing = res[0]
    })
  }

  addPhone(): void {
    this.mysql.insert("phone", {
      userData: {
        listing_id: this.listing.id,
        contact: this.phoneNumber
      }
    }).subscribe(() => {
      this.showPhone();
      this.phoneNumber = '';
    });
  }

  showPhone(): void {
    this.savedPhones = [];
    this.mysql.select('phone', {
      andWhere: {
        listing_id: this.listing.id
      }
    }).subscribe((res: any) => {
      console.log(res);
      Array.from(res).forEach((item: any) => {
        this.savedPhones.push(item.contact);
      })
    });
  }

  delete(phone: string): void {

    this.mysql.delete('phone', {
      andWhere: {
        contact: phone,
        listing_id: this.listing.id
      }
    }).subscribe(() => {
      this.showPhone();
    });
  }


}
