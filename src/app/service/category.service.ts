import { Injectable } from '@angular/core';
import { MySQLService } from './my-sql.service';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Array<Category> = [];
  constructor(private mysql: MySQLService) {
    this.retrieveFromServer();
  }

  /**
   * 
   * @param id of the Category
   */
  get(id: number): Category{
    return this.categories.find(x=> +x.id === id );
  }

  getAll(): Array<Category>{
    return this.categories;
  }

  getCount(): number{
    return this.categories.length;
  }

  retrieveFromServer(): void{
    this.mysql.select('categories').subscribe((res: any) => {
      this.categories = res;
    });
  }
}
