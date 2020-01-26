import { Component, OnInit } from '@angular/core';
import { MySQLService } from './../service/my-sql.service';
import { Category } from '../interface/category';
import { CategoryService } from '../service/category.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.scss'],
})
export class CategoryFormPage implements OnInit{
  title = 'New Category'
  categoryId: number;
  categoryName = '';
  lastInserted: Category = {id: 0, title: ''};
  isLoading = false;
  buttonTitle: string;

  constructor(
    private mysql: MySQLService, 
    private cs: CategoryService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = +params.get('id') ? +params.get('id') : null;
      this.buttonTitle = this.categoryId ? 'Update Category' : 'Create New'
      // console.log(this.categoryId);
      this.get();
    })
  }

  private get(){
    if( this.categoryId === null ){
      return;
    }
    this.mysql.select('categories', {
      andWhere: {id: this.categoryId}
    }).subscribe((res: any)=>{
      this.categoryName = res[0].title;
    });
  }

  async save() {
    this.isLoading = true;

    if( this.categoryId === null ){
      await this.mysql.insert('categories', {
        userData: {
          title: this.categoryName
        }
      }, true).subscribe((res: any)=> {
        this.lastInserted.id = res.lastInsertId;
        this.lastInserted.title = this.categoryName;
        this.categoryName = '';
        this.isLoading = false;
        this.cs.retrieveFromServer();
      });
    } else {
      await this.mysql.update('categories', {
        userData : {
          title: this.categoryName
        },
        andWhere: {
          id: this.categoryId
        }
      }).subscribe((res: any) => {
        this.lastInserted.id = this.categoryId;
        this.lastInserted.title = this.categoryName;
        this.isLoading = false;
        this.cs.retrieveFromServer();
      })
    }

  }

  hasInsertedRecently(): boolean{
    return this.lastInserted.id > 0;
  }
}
