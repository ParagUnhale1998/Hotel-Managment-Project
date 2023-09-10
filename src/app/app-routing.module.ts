import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './common/home/home.component';
// import { UserHomeComponent } from './user/user-home/user-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },  
  // { path: '', redirectTo: '/user/signUp', pathMatch: 'full' },  
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule) },
  // { path: '/', redirectTo: '/user', pathMatch: 'full' },  
  { path: '**', redirectTo: '/user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
