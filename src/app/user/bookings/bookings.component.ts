import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ConfirmationDialogComponent } from 'src/app/owner/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  allbookings: any[] = [];
  filteredUserBookings: any[] = [];
   bookingLength!:number;
  constructor(private userServicer: UserService,private toastr: TosterMessagesService,
    private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.getAllBookings();
    this.bookingLength = this.userServicer.getBookingsSubject()
  }

  getAllBookings() {
    this.userServicer.getAllBookings().subscribe({
      next: (bookings: any) => {
        this.allbookings = bookings;
        this.filterBookingsByUserID();
      },
    });
  }

  filterBookingsByUserID(): void {
    const userId = this.userServicer.userId
    this.filteredUserBookings = this.allbookings.filter(booking => booking.userID === userId);
    console.log(this.filteredUserBookings)
     this.bookingLength = this.filteredUserBookings.length
    this.userServicer.setBookingsSubject(this.bookingLength );

  }

 
  cancleBookings(id: any) {
    if (id) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this hotel?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {

            this.userServicer.deleteAllBooking(id).subscribe({
                next: (updatedData) => {
                  this.toastr.showSuccess('Booking deleted successfully', 'Success');
                  this.getAllBookings();
                },
                error: (error) => {
                  this.toastr.showError(`Booking`, 'Error Deleted Booking data !!');
                },
              });
          }
         else {
          console.log('Delete operation canceled.');
             }
            } )
    };
  }
  
}
