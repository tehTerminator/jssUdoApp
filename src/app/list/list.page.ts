import { Component, OnInit } from '@angular/core';
import { Category } from '../interface/category';
import { MySQLService } from '../service/my-sql.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  constructor(public categories: CategoryService, private mysql: MySQLService) {  }

  delete(theCategory: Category): void {
    this.mysql.delete('categories', {
      andWhere: {
        id: theCategory.id
      }
    }).subscribe(() => this.categories.retrieveFromServer());
  }
}
