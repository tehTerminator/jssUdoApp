import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { MySQLService } from './my-sql.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private user: User;

  constructor(private mysql: MySQLService, private router: Router ) {
    // For Testing Only
    // Please Remove this in Production
    this.user = {
      name: 'Prateek',
      authLevel: 10
    };
  }

  async login(username: string, thePassword: string){
    this.mysql.select('users', {
      andWhere: {
        name: username,
        password: thePassword
      }
    }).subscribe((res: any) => {
      if ( res.length >= 1 ){
        this.user = {
          name: res[0].name,
          authLevel: +res[0].authLevel,
          id: +res[0].id
        };
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login', {message: 'Invalid Username or Password'}]);
      }
    });
  }

  getAuthLevel(): number {
    if ( this.user === undefined || this.user === null ) {
      return 0;
    } else {
      return +this.user.authLevel;
    }
  }
}
