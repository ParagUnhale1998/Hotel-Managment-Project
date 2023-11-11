import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  activeButton: string = '';
  ownerIsRegister!:boolean;
  constructor(private router:Router,private service:OwnerService){}


  ngOnInit(): void {
    this.ownerIsRegister = this.service.getOwnerIsRegister()
    this.service.activeButton$.subscribe(button => {
      this.activeButton = button;
      console.log(this.activeButton)
    });
  }
  navigateToLogin(){
  
    this.router.navigateByUrl('/owner/signUp')

  }
  navigateToHome(){
    if (this.ownerIsRegister) {
      this.service.setActiveButton('Home');
      this.router.navigateByUrl('/owner/partnerWithUs')
    }
    else{
      this.service.setActiveButton('Home');
      this.router.navigateByUrl('/user')
    }
  }
  navigateToHotel(){
    this.service.setActiveButton('myHotels');
    this.router.navigateByUrl('/owner/myHotels')
  }
  navigateTOBooking(){
    this.service.setActiveButton('myBookings');
    this.router.navigateByUrl('/owner/myBookings')
  }
  navigateToLogout(){
    // this.service.ownerID = ''
    // console.log(this.service.ownerID)
    // this.service.setOwnerIsRegister(false);
    localStorage.setItem("ownerIsRegister","false")
    localStorage.setItem("ownerID",'')
    // localStorage.clear();
    this.service.ownerID = localStorage.getItem('ownerID')
    this.service.setOwnerIsRegister(this.service.getOwnerIsRegisteredFromLocalStorage());
    this.router.navigateByUrl('/user')
  }


}
