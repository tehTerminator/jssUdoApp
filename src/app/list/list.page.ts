import { Component, OnInit } from '@angular/core';
import { Category } from '../interface/category';
import { MySQLService } from '../service/my-sql.service';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  constructor(
    public categories: CategoryService, 
    private mysql: MySQLService,
    private route: Router
  ) {  }

  delete(theCategory: Category): void {
    this.mysql.select('listings', {
      category_id: theCategory.id
    }).subscribe((res: any) => {
      if( res.length > 0 ){
        return;
      } else {
        this.mysql.delete('categories', {
          andWhere: {
            id: theCategory.id
          }
        }).subscribe(() => this.categories.retrieveFromServer());
      }
    });
  }

  goto(category_id: number): void {
    // console.log(id);
    this.route.navigate(['/categoryForm', {id: category_id}]);
  }
}
