import { Component, OnInit ,Input,OnChanges,SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  @Input() cartLengthinput!: number;
  @Input() bookingLength!: number;
 

  userIsRegister: boolean = false;
  userData: any;
  cartLength!: number;
  bookingsLength!:number;
  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.bookingsLength = this.service.bookingsLengthSubject.getValue()
    this.userIsRegister = this.service.getUserIsRegister();
    this.getUserData();
  }

  // ngOnChanges(changes: SimpleChanges): void{
  //   if ('cartLengthinput' in changes) {
  //     const currentValue = changes['cartLengthinput'].currentValue;
  //     console.log('Cart Length:', currentValue);
  //     // Perform any operations you want with the updated cart length
  //     this.cartLength = currentValue ;
  //   }
  // }
  getUserData() {
    const id = this.service.userId;
    this.service.getUserByCode(id).subscribe((data) => {
      this.userData = data;
      this.cartLength = this.userData?.cart.length || 0;
      // console.log(this.cartLength)
    });
  }
  navigateToHome() {
    this.router.navigateByUrl('');
  
  }

  navigateToLogin() {
    this.router.navigateByUrl('user/login');
  }

  navigateToBusinessHome() {
    this.router.navigateByUrl('owner');
  }
  navigateToAdmin(){
    this.router.navigateByUrl('admin');

  }
  logout() {
    // this.service.setUserIsRegister(false);
    localStorage.setItem("UserIsRegister","false")
    localStorage.setItem("userId",'')
    localStorage.setItem("userpassword",'')
    // localStorage.clear();
    this.service.userId = localStorage.getItem('userId')
    this.service.setUserIsRegister(this.service.getUserIsRegisteredFromLocalStorage());
    this.service.Userpassword = localStorage.getItem('userpassword')
    this.userIsRegister = this.service.getUserIsRegister();

    this.router.navigateByUrl('/user');
  }
  navigateToCart() {
    this.router.navigateByUrl('user/cart');
  }
  navigateToBookings(){
    this.router.navigateByUrl('user/bookings');
  }
}
