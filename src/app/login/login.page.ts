import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  message = '';
  isHidden = false;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.message = params.get('message') ? params.get('message') : '';
    });
  }

  logIn(): void{
    this.message = "Please Wait...";
    this.isHidden = true;
    this.userService.login(this.username, this.password);
  }

}
