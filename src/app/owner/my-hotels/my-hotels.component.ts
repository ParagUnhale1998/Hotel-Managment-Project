import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { ToastrService } from 'ngx-toastr';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrls: ['./my-hotels.component.scss'],
})
export class MyHotelsComponent implements OnInit {
  displayedColumns: string[] = [
    'serialNumber',
    'id',
    'hotelName',
    'star',
    'location',
    'price',
    'rooms',
    'discription',
    'phoneNo',
    'availability',
    'image',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ownerIsRegister!: boolean;
  hotelData: any;

  constructor(
    private router: Router,
    private service: OwnerService,
    private dialog: MatDialog,
    private toastr: TosterMessagesService
  ) {}

  ngOnInit(): void {
    this.getOwnerData();
  }

  getOwnerData(): void {
    const ownerId = this.service.ownerID; //'paragunhale123'
    this.ownerIsRegister = this.service.getOwnerIsRegister();

    this.service.getOwnerData(ownerId).subscribe({
      next: (res: any) => {
        this.hotelData = res.hotels;
        // console.log( this.hotelData)
        // console.log( this.hotelData.length)
        this.hotelData.forEach((hotel: any, index: number) => {
          hotel.serialNumber = index + 1;
        });

        this.dataSource = new MatTableDataSource(res.hotels);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // console.log('sortData' + res.hotels);
        if (this.hotelData.length === 0) {
          this.toastr.showWarning('No Hotels Data Available !!', 'Error');
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.toastr.showError('Something went wrong!', 'Error');
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToAddHotel(): void {
    if (this.ownerIsRegister) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = {
        editMode: false,
        getHotelData: this.getOwnerData.bind(this),
      };

      const dialogRef = this.dialog.open(AddHotelComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
      });
    } else {
      this.router.navigateByUrl('/owner/signUp');
    }
  }

  onEdit(hotel: any): void {
    this.dialog.open(AddHotelComponent, {
      data: {
        hotelData: hotel,
        editMode: true,
        getHotelData: this.getOwnerData.bind(this),
      },
      disableClose: false,
    });
    this.dialog.afterAllClosed.subscribe((res) => {
      this.getOwnerData();

      console.log('closed');
    });
  }

  onDelete(hotel: any) {
    if (hotel) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Are you sure you want to delete this hotel?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          const hotelIndex = this.hotelData.findIndex(
            (h: any) => h.id === hotel.id
          );
          if (hotelIndex !== -1) {
            this.hotelData.splice(hotelIndex, 1); // Remove the hotel from the hotels array
            // console.log('Hotel Deleted', hotel);
            // console.log('Hotel Deleted:before' + hotel.id);
            this.deleteAllHotelData(hotel.id); // Remove the hotel from aLLhotels array
            // console.log('Hotel Deleted after:', hotel);
            this.service
              .deleteOwnerHotels(this.service.ownerID, this.hotelData)
              .subscribe({
                next: (updatedData) => {
                  this.getOwnerData();
                  console.log('Hotel Data Updated:', updatedData);
                  this.toastr.showSuccess(`Hotel`, 'Deleted Successfully !!');
                },
                error: (error) => {
                  this.toastr.showError(`Hotel`, 'Error Deleted hotel data !!');
                  console.error('Error Deleted hotel data:', error);
                },
              });
          }
        } else {
          console.log('Delete operation canceled.');
        }
      });
    }
  }

  deleteAllHotelData(id: any) {
    this.service
      .deleteAllHotelData(id)
      .subscribe((res) => console.log('allhotels hotel deleted' + res));
    this.getOwnerData();
  }

}

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