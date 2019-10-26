import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
  pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'categoryForm', 
    loadChildren: () => import('./category-form/category-form.module').then(m=>m.CategoryFormPageModule) 
  },
  { 
    path: 'new-listing-form', 
    loadChildren: () => import('./new-listing-form/new-listing-form.module').then(m=>m.NewListingFormPageModule)
  },
  { 
    path: 'add-phone/:listing_id', 
    loadChildren: () => import ('./add-phone/add-phone.module').then(m=>m.AddPhonePageModule)
  },
  { 
    path: 'view-listing/:listing_id', 
    loadChildren: () => import('./view-listing/view-listing.module').then(m=>m.ViewListingPageModule)
  },
  { 
    path: 'login', loadChildren: () => import ('./login/login.module').then(m=> m.LoginPageModule) 
  },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m=>m.SearchPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
