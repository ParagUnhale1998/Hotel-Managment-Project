import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from '../auth.guard';
import { BookingsComponent } from './bookings/bookings.component';
// import { HotelsComponent } from './hotels/hotels.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { RegisterHotelComponent } from './register-hotel/register-hotel.component';
// import { BookHotelComponent } from './book-hotel/book-hotel.component';

const routes: Routes = [
  // { path: '', component: UserHomeComponent , children:[
  //   { path: '', component: HotelsComponent },
  //   { path: 'cart', component: CartComponent },
  //   { path: 'login', component: LoginComponent },

  // ]},
  { path: '', component: UserHomeComponent },
  // { path: 'registerHotel', component: RegisterHotelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent ,canActivate:[authGuard]},
  { path: 'bookings', component: BookingsComponent ,canActivate:[authGuard]},
  // { path: 'signUp', component: LoginComponent },
  // { path: 'signUp', component: SignUpComponent },
  // { path: '', redirectTo: '/user', pathMatch: 'full' },  

  { path: '**', redirectTo: '/user' },
  // {path:'bookHotel',component:BookHotelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
