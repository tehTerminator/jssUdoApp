import { Component } from '@angular/core';
import { MySQLService } from './../service/my-sql.service';
import { Category } from '../interface/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
})
export class CategoryFormPage{
  title = 'New Category'
  categoryName = '';
  lastInserted: Category = {id: 0, title: ''};
  isLoading = false;

  constructor(
    private mysql: MySQLService, 
    private cs: CategoryService,
  ) {  }

  async save() {
    this.isLoading = true;
    await this.mysql.insert('categories', {
      userData: {
        title: this.categoryName
      }
    }, true).subscribe((res: any)=> {
      this.lastInserted.id = res.lastInsertId;
      this.lastInserted.title = this.categoryName;
      this.categoryName = '';
      this.isLoading = false;
    });

    this.cs.retrieveFromServer();
  }

  hasInsertedRecently(): boolean{
    return this.lastInserted.id > 0;
  }
}
