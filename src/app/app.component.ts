import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserServiceService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      level: 0,
    },
    {
      title: 'Search',
      url: '/search',
      icon: 'search',
      level: 0
    },
    {
      title: 'Add Category',
      url: '/categoryForm',
      icon: 'folder-open',
      level: 5,
    },
    {
      title: 'List Categories',
      url: '/list',
      icon: 'list',
      level: 5
    },
    {
      title: 'New Listing',
      url: '/new-listing-form',
      icon: 'add',
      level: 5
    },
    {
      title: 'Cities',
      url: '/city-form',
      icon: 'map',
      level: 9
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'contacts',
      level: 0
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isAuthorised(level: number): boolean{
    return level <= this.userService.getAuthLevel();
  }
}
