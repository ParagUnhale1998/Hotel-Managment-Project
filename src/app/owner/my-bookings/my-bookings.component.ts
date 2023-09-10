import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { ToastrService } from 'ngx-toastr';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent {
  displayedColumns: string[] = [
    'serialNumber',
    'id',
    'hotelID',
    'fullName',
    'phone',
    'email',
    'bookingDate',
    'bookingExitDate',
    'paymentMethod',
    'guests',
    'rooms',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private service: OwnerService,
    private toastr: TosterMessagesService,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.getBookingsList();
  }

  getBookingsList() {
    const ownerId = this.service.ownerID; //'paragunhale123'
    this.service.getAllBookings().subscribe({
      next: (res: any) => {
        const filteredData = res.filter((booking: any) => booking.ownerID === ownerId );
        //for add serial Number 
        filteredData.forEach((booking: any, index: number) => {
          booking.serialNumber = index + 1;
        });

        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        console.log(filteredData);
        if (filteredData.length === 0) {
          this.toastr.showWarning('No Bookings Data Available !!', 'Error');
        }
      },
      error: (err: any) => void console.log(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBookings(id: any) {
    if (id) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this hotel?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {

            this.service.deleteAllBooking(id).subscribe({
                next: (updatedData) => {
                  this.toastr.showSuccess('Booking deleted successfully', 'Success');
                  this.getBookingsList()
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
  //   this.service.deleteAllBooking(id).subscribe((res) => {
  //     console.log('Booking deleted successfully.');
  //     this.toastr.showSuccess('Booking deleted successfully', 'Success');
  //     this.getBookingsList(); // Refresh the bookings after deletion
  //   });
  // }

 

 // navigateToHome() {
  //   this.router.navigateByUrl('partnerWithUs');
  // }
  // navigateToHotel() {
  //   this.router.navigateByUrl('myHotels');
  // }
  // navigateTOBooking() {
  //   this.router.navigateByUrl('myBookings');
  // }
  // navigateToLogout() {
  //   this.service.ownerID = ''
  //   console.log(this.service.ownerID)
  //   this.service.setOwnerIsRegister(false);
  //   this.router.navigateByUrl('/user');
  // }