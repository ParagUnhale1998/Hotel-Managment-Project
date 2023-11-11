import { Component, Inject, OnInit,DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.scss'],
})
export class BookHotelComponent implements OnInit,DoCheck{
  bookHotelForm!: FormGroup;
  confirmPaymentForm!: FormGroup;
  paymentMethods = ['Net-Banking', 'UPI', 'QR'];
  confirmPayment: boolean = false;
  bookingSuccessfull: boolean = false;
  progressBarValue = 0; 
  progressBarType = 'info'; 
  progressBarMessage = '';
  userId:any;

  constructor(
    private userService: UserService,
    // private snackBar: MatSnackBar,
    private router:Router,
    private fb: FormBuilder,
    private toster: TosterMessagesService,
    public dialogRef: MatDialogRef<BookHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.bookingForm();
      console.log(this.data.hotelData.id)
      console.log(this.data.hotelData)
    } 
    this.userId = this.userService.userId
  }
ngDoCheck(): void {
  this.updateProgressBarUsingMath()

  if(this.confirmPayment){
    this.secondprogressbar()
  }
}
  updateProgressBarUsingMath() {
    const formValue = this.bookHotelForm.value;
    const filledFields = Object.keys(formValue).filter((key) => !!formValue[key]).length;
      switch (filledFields) {
        case 9:
          this.updateProgressBar('info',10,'5%')
          break;
          case 10:
            this.updateProgressBar('info',15,'10%')
            break;
            case 11:
            this.updateProgressBar('info',25,'20%')
            break;
            case 12:
            this.updateProgressBar('info',30,'25%')
            break;
            case 13:
            this.updateProgressBar('info',35,'30%')
            break;
            case 14:
              this.updateProgressBar('info',40,'40%')
              break;
              case 15:
                this.updateProgressBar('info',50,'50%')
                break;
        default:
          break;
      }
  }
  
  secondprogressbar(){
    const secondFormValue = this.confirmPaymentForm.value;
    const secondfilledFields = Object.keys(secondFormValue).filter((key) => !!secondFormValue[key]).length;
    switch (secondfilledFields) {
      case 16:
        this.updateProgressBar('warning',70,'70%')
        break;
        case 17:
          this.updateProgressBar('warning',90,'90%')
          break;
        default:
          break;
      }
  }

  bookingForm() {
    this.bookHotelForm = this.fb.group({
      ownerID: [this.data.ownerId],
      hotelID: [this.data.hotelData.id],
      hotelName: [this.data.hotelData.hotelName],
      hotelImage: [this.data.hotelData.image],
      hotelAddress: [this.data.hotelData.location],
      hotelPrice: [this.data.hotelData.price],
      hotelPhoneNo: [this.data.hotelData.phoneNo],
      userID:[this.userId],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bookingDate: [null, Validators.required],
      bookingExitDate: [null, Validators.required],
      // paymentMethod: ['', Validators.required],
      guests: ['', Validators.required],
      rooms: ['', Validators.required],
    });
  }

  ConfirmPaymentForm(bookhotelformValues: any) {
    const {
      fullName,
      phone,
      email,
      bookingDate,
      bookingExitDate,
      guests,
      rooms,
    } = bookhotelformValues;
    this.confirmPaymentForm = this.fb.group({
      ownerID: [this.data.ownerId],
      hotelID: [this.data.hotelData.id],
      hotelName: [this.data.hotelData.hotelName],
      hotelImage: [this.data.hotelData.image],
      hotelAddress: [this.data.hotelData.location],
      hotelPrice: [this.data.hotelData.price],
      hotelPhoneNo: [this.data.hotelData.phoneNo],
      userID:[this.userId],
      fullName: [fullName],
      phone: [phone],
      email: [email],
      bookingDate: [bookingDate],
      bookingExitDate: [bookingExitDate],
      guests: [guests],
      rooms: [rooms],
      paymentMethod: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  confirmPaymentAndBookHotel() {
    if (this.confirmPaymentForm.valid) {
      const password = this.userService.Userpassword;
      this.updateProgressBar('success',90,'90%')
      if (password === this.confirmPaymentForm.value.password) {
        this.updateProgressBar('success',100,'Complete')
        const endpoint = 'Allbookings';
        console.log(
          'Form data submitted valid:',
          this.confirmPaymentForm.value
        );
        this.userService
          .BookHotel(endpoint, this.confirmPaymentForm.value)
          .subscribe({
            next: (res) => {
              this.confirmPayment = false
              this.bookingSuccessfull = true
              console.log('booking Data' + res);
              this.toster.showSuccess('Hotel Register Success', 'Successfull');
              // this.dialogRef.close();
            },
            error: (error) => {
              console.error('Error booking hotel:', error);
              this.toster.showError(
                'An error occurred while booking hotel',
                'Error'
              );
            },
          });
      }else{
        this.toster.showWarning('Please enter Correct Password', 'Warning');
      }
    } else {
      // console.log('Please enter valid data');
      this.toster.showWarning('Please enter valid data', 'Warning');
    }
  }
  navigateToConfirmBooking() {
    if (this.bookHotelForm.valid) {
      // this.updateProgressBar('warning',50,'50%')
      const bookhotelformValues = this.bookHotelForm.value;
      this.confirmPayment = true;
      this.ConfirmPaymentForm(bookhotelformValues);
    } else {
      this.toster.showWarning('Please enter valid data', 'Warning');
    }
  }
  
  navigateToBooking(){
this.router.navigateByUrl('/user/bookings')
  }
  close() {
    this.dialogRef.close();
  }
  updateProgressBar(type: string,value: number,  message: string) {
    this.progressBarType = type;
    this.progressBarValue = value;
    this.progressBarMessage = message;
  }
  
}

/* bookHotelForm!: FormGroup;
  paymentMethods = ['Net-Banking', 'UPI', 'QR'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.bookHotels()
    this.bookingForm()
  }
  bookHotels() {
    const cart = this.data.userData.cart
    if (this.data.userData) {
      this.bookAllHotels();
    } else if(this.data.ownerId && this.data.hotelID) {
      // Single booking logic
      this.bookHotel();
    }
  }
  bookingForm(){
    // console.log(this.data.ownerId,this.data.hotelID)
    this.bookHotelForm = this.fb.group({
      ownerID: [this.data.ownerId],
      hotelID: [this.data.hotelID],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bookingDate: [null, Validators.required],
      bookingExitDate: [null, Validators.required],
      paymentMethod: ['', Validators.required],
      guests: ['', Validators.required],
      rooms: ['', Validators.required],
    });
  }

  bookHotel() {
    if (this.bookHotelForm.valid) {
      const endpoint = 'Allbookings';
      console.log('Form data submitted valid:', this.bookHotelForm.value);
      this.userService.BookHotel(endpoint, this.bookHotelForm.value).subscribe({
        next : (res) => {
          console.log('booking Data' + res);
          this.snackBar.open('Hotel Register Success', 'Dismiss', {
            duration: 3000, //
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.dialogRef.close();

        },
        error : (error) => {
          console.error('Error booking hotel:', error);
          this.snackBar.open('An error occurred while booking hotel', 'Dismiss', {
            duration: 3000, //
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        }
      
      });
      // this.dialogRef.close();
    } 

    else {
      console.log('Please enter valid data');
      this.snackBar.open('Please enter valid data', 'Dismiss', {
        duration: 3000, //
        panelClass: 'success-snackbar',
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }

  close() {
    this.dialogRef.close();
  }



  bookAllHotels() {
    for (const hotel of this.data.userData.cart) {
      // console.log(hotel)
      this.bookSingleHotel(hotel);
    }
  }

  bookSingleHotel(hotel: any) {
    if (!this.data.userData || !this.data.userData.cart) {
      console.error('User data or cart is not available');
      return;
    }
    // Implement the logic to book a single hotel here
    const endpoint = 'Allbookings';
    const bookingDetails = {
      ownerID: hotel.ownerId,
      hotelID: hotel.id,
      fullName: this.bookHotelForm.value.fullName,
      phone: this.bookHotelForm.value.phone,
      email: this.bookHotelForm.value.email,
      bookingDate: this.bookHotelForm.value.bookingDate,
      bookingExitDate: this.bookHotelForm.value.bookingExitDate,
      paymentMethod: this.bookHotelForm.value.paymentMethod,
      guests: this.bookHotelForm.value.guests,
      rooms: this.bookHotelForm.value.rooms,
      // Add other relevant booking details here
    };
    this.userService.BookHotel(endpoint, bookingDetails).subscribe({
      next: (res) => {
        console.log('Hotel booked:', hotel);
        // Handle success, e.g., remove booked hotel from cart
        const cartItemIndex = this.data.userData.cart.findIndex(
          (item: any) => item.id === hotel.id
        );
        if (cartItemIndex !== -1) {
          this.data.userData.cart.splice(cartItemIndex, 1);
        }
      },
      error: (error) => {
        console.error('Error booking hotel:', error);
        // Handle error, e.g., show error message
        this.snackBar.open('An error occurred while booking hotel', 'Dismiss', {
          duration: 3000,
          panelClass: 'error-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      },
    });
  }
}*/
/*  bookHotelForm!: FormGroup;
  paymentMethods = ['Net-Banking', 'UPI', 'QR'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.bookingForm()
  }
 
  bookingForm(){
    this.bookHotelForm = this.fb.group({
      ownerID: [this.data.ownerId],
      hotelID: [this.data.hotelID],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bookingDate: [null, Validators.required],
      bookingExitDate: [null, Validators.required],
      paymentMethod: ['', Validators.required],
      guests: ['', Validators.required],
      rooms: ['', Validators.required],
    });
  }

  bookHotel() {
    if (this.bookHotelForm.valid) {
      const endpoint = 'Allbookings';
      console.log('Form data submitted valid:', this.bookHotelForm.value);
      this.userService.BookHotel(endpoint, this.bookHotelForm.value).subscribe({
        next : (res) => {
          console.log('booking Data' + res);
          this.snackBar.open('Hotel Register Success', 'Dismiss', {
            duration: 3000, //
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.dialogRef.close();

        },
        error : (error) => {
          console.error('Error booking hotel:', error);
          this.snackBar.open('An error occurred while booking hotel', 'Dismiss', {
            duration: 3000, //
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        }
      
      });
      // this.dialogRef.close();
    } 

    else {
      console.log('Please enter valid data');
      this.snackBar.open('Please enter valid data', 'Dismiss', {
        duration: 3000, //
        panelClass: 'success-snackbar',
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }
  close() {
    this.dialogRef.close();
  }*/
