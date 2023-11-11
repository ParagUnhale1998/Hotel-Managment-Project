import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BookHotelComponent } from '../book-hotel/book-hotel.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  userIsRegister: boolean = false;
  hotelListData!: any;
  searchInput: any;
  filteredHotels:any;
  @ViewChild(NavbarComponent) childComponentRef!: NavbarComponent;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private toster:TosterMessagesService
  ) { }

  ngOnInit(): void {
    this.userService.userIsRegister$.subscribe((value) => {
      this.userIsRegister = value;
    });

    this.userService.getHotelList().subscribe((data) => {
      console.log(data)
      this.hotelListData = data;
      this.filteredHotels =data
      console.log(this.hotelListData);
    });
  }
 
  // get _searchInput() {
  //   return this.searchInput;
  // }
  
  // set _searchInput(value: string) {
  //   this.searchInput = value;
  //   this.updateFilteredHotels(); 
  // }
  
  // updateFilteredHotels() {
  //   this.filteredHotels = this.hotelListData.filter((hotel: any) => {
  //     return JSON.stringify(hotel).toLowerCase().includes(this.searchInput.toLowerCase());
  //   });
  // }

  loginpage() {
    this.router.navigateByUrl('user/login');
  }

  bookNow(id: any, hotel: any) {
    this.dialog.open(BookHotelComponent, {
      data: { ownerId: id, hotelData: hotel },
    });
  }
  addToCart(id: any, id2: any){
    this.router.navigate(['user/cart'], {
      queryParams: { ownerId: id, hotelId: id2 },
    });
    // this.userService.updateCartData(id, id2);
    // this.toster.showSuccess('Hotel Added To Cart','Success!')
    // this.router.navigate(['user/cart'])
    // this.userService.triggerCartUpdate();

  }
}
