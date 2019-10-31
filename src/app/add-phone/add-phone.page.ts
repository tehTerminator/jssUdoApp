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

  async getListing(listing_id: number) {
    await this.mysql.select('listings', {
      andWhere: {
        id: listing_id
      }
    }).subscribe((res: any) => {
      this.listing = res[0]
    })
  }

  async addPhone(){
    await this.mysql.insert("phone", {
      userData: {
        listing_id: this.listing.id,
        contact: this.phoneNumber
      }
    }).subscribe(() => {
      this.showPhone();
      this.phoneNumber = '';
    });
  }

  async showPhone(){
    this.savedPhones = [];
    await this.mysql.select('phone', {
      andWhere: {
        listing_id: this.listing.id
      }
    }).subscribe((res: any) => {
      Array.from(res).forEach((item: any) => {
        this.savedPhones.push(item.contact);
      })
    });
  }

  async delete(phone: string){

    await this.mysql.delete('phone', {
      andWhere: {
        contact: phone,
        listing_id: this.listing.id
      }
    }).subscribe(() => {
      this.showPhone();
    });
  }


}
