import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwnerService } from '../owner.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
})
export class AddHotelComponent implements AfterViewInit {
  hotelRegistration!: FormGroup;

  owner: any | undefined;

  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: OwnerService,
    private toastr: TosterMessagesService,

    public dialogRef: MatDialogRef<AddHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.editMode = this.data.editMode;
    this.getOwnerData();
   this.hotelRegistrationForm()
   
  }

  hotelRegistrationForm() {
    this.hotelRegistration = this.formBuilder.group({
      ownerId: [this.editMode ? this.data.hotelData.ownerId: this.hotelService.ownerID,],
      id: [ this.editMode ?this.data.hotelData.id : '', Validators.required],
      hotelName: [ this.editMode ? this.data.hotelData.hotelName: '', Validators.required],
      star: [this.editMode ? this.data.hotelData.star: ''],
      location: [this.editMode ? this.data.hotelData.location: ''],
      price: [this.editMode ? this.data.hotelData.price: ''],
      rooms: [this.editMode ? this.data.hotelData.rooms: ''],
      discription: [this.editMode ? this.data.hotelData.discription: ''],
      phoneNo: [this.editMode ? this.data.hotelData.phoneNo: ''],
      availability: [this.editMode ? this.data.hotelData.availability: ''],
      image: [this.editMode ? this.data.hotelData.image: ''],
      images: [this.editMode ? this.data.hotelData.images: ''],
      bookings: this.formBuilder.array([]),
    });
  }


  getOwnerData() {
    const ownerId = this.hotelService.ownerID; 
    // const ownerId = 'paragunhale123'; 
    // console.log(ownerId);
    this.hotelService.getOwnerById(ownerId).subscribe({
      next : (owner) => {
        this.owner = owner;
      },error :
      (error) => console.error('Error fetching owner data:', error)
    } );
  }

  onSubmit() {
    if (this.editMode) {
      this.updateHotelData();
    } else {
      this.addNewHotel();
    }
  }

  updateHotelData(){
    const hotelIndex = this.owner.hotels.findIndex(
      (hotel: any) => hotel.id === this.data.hotelData.id
    );
    if (hotelIndex !== -1) {
      this.owner.hotels[hotelIndex] = this.hotelRegistration.value;
      this.hotelService.updateALLHotelData( this.data.hotelData.id,this.hotelRegistration.value)
        .subscribe((res) => console.log('update All hotels Data'));


      this.hotelService.updateOwner(this.owner.id, this.owner).subscribe({
       next: (updatedOwner) => {
          // console.log('Hotel Updated:', updatedOwner);
          this.toastr.showSuccess(`Hotel`, 'Updated Successfully ');
          
          this.owner = updatedOwner;
          this.editMode = false;
          this.hotelRegistration.reset();
          this.dialogRef.close();
          this.data.getHotelData()
        },error :
        (error) => {
          // console.error('Error updating owner data:', error);
          this.toastr.showError('Error updating Hotel Data', 'Failed Updating');
        }
      });
  }
}

  addNewHotel() {
    if (this.hotelRegistration.valid) {
      if (this.owner) {
        this.addToAllHotels();
        this.owner.hotels.push(this.hotelRegistration.value);

        this.hotelService.updateOwner(this.owner.id, this.owner).subscribe(
          (updatedOwner) => {
            this.toastr.showSuccess(
              `Your ${this.hotelRegistration.value.name}`,
              'Hotel Added Successfully !!'
            );
            this.data.getHotelData();
            this.owner = updatedOwner;
          },
          (error) => {
            this.toastr.showError('Error adding Hotel', 'Failed Hotel');
          }
        );
        this.hotelRegistration.reset();
        this.dialogRef.close();
      } else {
        this.toastr.showError('Error Hotel owner', 'Failed Hotel');
      }
    }
  }


  addToAllHotels() {
    this.hotelService .addHotelToAll(this.hotelRegistration.value)
      .subscribe((data) => console.log(' add alldata' + data));
  }

  cancel() {
    this.dialogRef.close();
    this.editMode = false;
  }

  ngAfterViewInit(): void {
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        this.editMode = false;
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }
}


/*ngOnInit() {
    this.getOwnerData();

    if (this.editMode) {
      this.updatehotelRegistrationForm();
    } else {
      this.hotelRegistrationForm();
    }
  }

  updatehotelRegistrationForm() {
    this.hotelRegistration = this.formBuilder.group({
      ownerId: [this.data.hotelData.ownerId],
      id: [this.data.hotelData.id, Validators.required],
      hotelName: [this.data.hotelData.hotelName, Validators.required],
      star: [this.data.hotelData.star],
      location: [this.data.hotelData.location],
      price: [this.data.hotelData.price],
      rooms: [this.data.hotelData.rooms],
      discription: [this.data.hotelData.discription],
      phoneNo: [this.data.hotelData.phoneNo],
      availability: [this.data.hotelData.availability],
      image: [this.data.hotelData.image],
      images: [this.data.hotelData.images],
    });
  }

  hotelRegistrationForm() {
    this.hotelRegistration = this.formBuilder.group({
      ownerId: ['paragunhale123'],
      id: ['', Validators.required],
      hotelName: ['', Validators.required],
      star: [''],
      location: [''],
      price: [''],
      rooms: [''],
      discription: [''],
      phoneNo: [''],
      availability: [''],
      image: [''],
      images: [''],
      bookings: this.formBuilder.array([]),
    });
  }

  getOwnerData() {
    const ownerId = this.hotelService.ownerID; 
    // const ownerId = 'paragunhale123'; 
    console.log(ownerId);
    this.hotelService.getOwnerById(ownerId).subscribe(
      (owner) => {
        this.owner = owner;
      },
      (error) => console.error('Error fetching owner data:', error)
    );
  }

  onSubmit() {
    if (this.editMode) {
      const hotelIndex = this.owner.hotels.findIndex(
        (hotel: any) => hotel.id === this.data.hotelData.id
      );
      if (hotelIndex !== -1) {
        this.owner.hotels[hotelIndex] = this.hotelRegistration.value;
        this.hotelService.updateALLHotelData( this.data.hotelData.id,this.hotelRegistration.value)
          .subscribe((res) => console.log('update All hotels Data'));


        this.hotelService.updateOwner(this.owner.id, this.owner).subscribe(
          (updatedOwner) => {
            // console.log('Hotel Updated:', updatedOwner);
            this.toastr.showSuccess(`Hotel`, 'Updated Successfully ');
            
            this.owner = updatedOwner;
            this.editMode = false;
            this.hotelRegistration.reset();
            this.dialogRef.close();
            this.data.getHotelData()
          },
          (error) => {
            // console.error('Error updating owner data:', error);
            this.toastr.showError('Error updating Hotel Data', 'Failed Updating');
          }
        );
      }
    } else {
      if (this.hotelRegistration.valid) {
        if (this.owner) {
          this.addToAllHotels();
          this.owner.hotels.push(this.hotelRegistration.value);
          this.hotelService.updateOwner(this.owner.id, this.owner).subscribe(
            (updatedOwner) => {
              console.log('Hotel added to owner:', updatedOwner);
              this.toastr.showSuccess(
                `Your ${this.hotelRegistration.value.name}`,
                'Hotel Added Successfully !!');
                this.data.getHotelData()
              this.owner = updatedOwner;
            },
            (error) => {
              console.log(error);
              this.toastr.showError('Error adding Hotel', 'Failed Hotel');
            }
            );
            this.hotelRegistration.reset();
            this.dialogRef.close();
          } else {
            this.toastr.showError('Error Hotel owner', 'Failed Hotel');
          }
      }
    }
  }

  addToAllHotels() {
    this.hotelService
      .addHotelToAll(this.hotelRegistration.value)
      .subscribe((data) => console.log(' add alldata' + data));
  }

  cancel() {
    this.dialogRef.close();
    this.editMode = false;
  }

  ngAfterViewInit(): void {
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        this.editMode = false;
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }*/