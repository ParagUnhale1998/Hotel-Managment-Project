import { Component, OnInit ,AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { BookHotelComponent } from '../book-hotel/book-hotel.component';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';
// import { Subscription } from 'rxjs';
// import { find } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit ,AfterContentChecked {
  allHotels: any[] = [];
  hotelData: any;
  userData: any;
  hotelId: any;
  cartLength:any;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private dialog: MatDialog,
    private toster:TosterMessagesService

  ) {}

  ngOnInit(): void {
    this.getUserData();
   this.route.queryParams.subscribe((params) => {
  const ownerId = params['ownerId'];
  const hotelId = params['hotelId'];
  this.hotelId = hotelId
});
    this.getHotelData();

  }
 
  getUserData() {
    const userId = this.service.userId;
    this.service.getUserByCode(userId).subscribe((data) => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  getHotelData() {
    this.service.getHotelList().subscribe((data: any) => {
      this.allHotels = data;
      console.log(this.allHotels);
      this.findHotel();
    });
  }

  findHotel() {
    console.log(this.hotelId);
    this.hotelData = this.allHotels.find((hotel: any) => {
      return hotel.id === this.hotelId;
    });
    console.log(this.hotelData);
    this.addItemToCart();
  }

  addItemToCart() {
    const id = this.service.userId;
    if (id && this.hotelData) {
      const isAlreadyInCart = this.userData.cart.some(
        (item: any) => item.id === this.hotelId
      );
      if (!isAlreadyInCart) {
        const newItem = {
          cart: [...this.userData.cart, this.hotelData],
        };
        this.userData.cart.push(this.hotelData);
        this.service.addToCart(id, newItem).subscribe((user) => {
              this.toster.showSuccess('Hotel Added To Cart','Success!')
          console.log('Cart updated:', user);
          this.service.updateCartData('', '');

        });
      } else {
        this.toster.showWarning('Hotel is already in the cart','Warning!')
        // alert('Hotel is already in the cart.');
      }
    }
  }

  removeFromCart(hotelId: any) {
    const id = this.service.userId;
    const cartItemIndex = this.userData.cart.findIndex(
      (hotel: any) => hotel.id == hotelId
    );
    if (cartItemIndex !== -1) {
      this.userData.cart.splice(cartItemIndex, 1);
      const updateCart = {
        cart: [...this.userData.cart],
      };
      this.service.removeFromCart(id, updateCart).subscribe((user: any) => {
        this.toster.showSuccess('Cart Item Deleted '+ hotelId,'Success!')

        console.log('Cart Item Deleted:', user);
      });
    }
  }

  getTotalCartPrice(): number {
    let total = 0;
    for (const hotel of this.userData.cart) {
      total += hotel.price;
    }
    return total;
  }

  bookHotelsNow(id: any, hotel: any) {
    console.log(id, hotel);
    this.dialog.open(BookHotelComponent, {
      data: { ownerId: id, hotelData: hotel },
    });
  }

  ngAfterContentChecked(): void {
  this.cartLength =  this.userData.cart.length
  }
}
    
    // this.service.cartData$.subscribe((data) => {
    //   if (data) {
    //     const ownerId = data.ownerId;
    //     const hotelId = data.hotelId;
    //     this.hotelId = hotelId;
    //   }
    // });
    // this.cartUpdateSubscription = this.service.cartUpdate$.subscribe(() => {
    //   // Trigger the logic you want to update in your CartComponent
    //   this.updateCartData();
    //   console.log('calling function')
    // });

// this.route.queryParams.subscribe((params) => {
//   const ownerId = params['ownerId'];
//   const hotelId = params['hotelId'];
//   this.hotelId = hotelId
// });
  // private cartUpdateSubscription!: Subscription;

 // updateCartData(){
  //   this.getUserData();
  //   this.getHotelData();
  //   this.service.cartData$.subscribe((data) => {
  //     if (data) {
  //       const ownerId = data.ownerId;
  //       const hotelId = data.hotelId;
  //       this.hotelId = hotelId;
  //     }
  //   });
  // }
  // ngOnDestroy(): void {
  //   this.cartUpdateSubscription.unsubscribe();
  // }

//  this.userData =  this.userData.cart.filter((hotel:any) => hotel.id !== hotelId)

// const newItem = {
//   cart: [...this.userData.cart]
// };
// this.service.addToCart(id, newItem).subscribe((user) => {
//   console.log('Cart item Deleted:', user);
// });

// bookAllHotelsNow(){
//   this.dialog.open(BookHotelComponent, {
//     data: { userData: this.userData.cart },
//   });
// }
