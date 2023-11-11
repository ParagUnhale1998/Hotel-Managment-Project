import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { SharedModule } from '../shared/shared.module';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { RegisterHotelComponent } from './register-hotel/register-hotel.component';
import { MaterialModule } from '../shared/material/material.module';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { OwnerModule } from '../owner/owner.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../filter.pipe';
import { AdsComponent } from './ads/ads.component';
import { UserfooterComponent } from './userfooter/userfooter.component';
import { CartComponent } from './cart/cart.component';
import { BookingsComponent } from './bookings/bookings.component';
import { InstructionsComponent } from './instructions/instructions.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    HotelsComponent,
    LoginComponent,
    SignUpComponent,
    // RegisterHotelComponent,
    BookHotelComponent,
    NavbarComponent,
    FilterPipe,
    AdsComponent,
    UserfooterComponent,
    CartComponent,
    BookingsComponent,
    InstructionsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule,
    OwnerModule,
    NgbRatingModule
  ]
})
export class UserModule { }
