import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerLoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { OwnerService } from '../owner.service';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registrationForm!: FormGroup;
  isMatch!: boolean;
  isValid!: any;
  imageID:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private ownerService: OwnerService,
    private toastr :TosterMessagesService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      id: ['', [Validators.required, this.whiteSpaceValidator]], 
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      phoneNO: ['', Validators.required],
      password: ['',  [ Validators.required,Validators.minLength(6),this.whiteSpaceValidator]],
      confirmPassword: ['', Validators.required],
      idCard: [null],
      address: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      hotels: this.formBuilder.array([]),
      bookings: this.formBuilder.array([]),
    });
  }

  whiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    let data = control.value;
    let newdata = data?.trim();
    let isValid = data.length != newdata.length;
    return isValid ? { whiteSpace: true } : null;
  }

  ConfirmPass() {
    this.isMatch =
      this.registrationForm.get('password')?.value ===
      this.registrationForm.get('confirmPassword')?.value;
  }
//   onFileSelected(event: any){
//     const file: File = event.target.files[0];
//     if (file) {
//     const reader = new FileReader();
//     reader.onload = (event:any) => {
//       const base64Image = event.target.result.split(',')[1]; // Extract base64 data
//       this.imageID = base64Image
//     };
//     reader.onerror = (err) => {
//       console.log('fileReader',err)
//     };
//     reader.readAsDataURL(file); // Read the selected file as a data URL

//   }
  
// }

  onSubmit() {
    if (this.registrationForm.valid) {
      // const formdata = this.registrationForm.value
      // formdata.imageID = this.imageID
      // formdata.append('imageID', this.imageID);

      this.ownerService.postOwner(this.registrationForm.value).subscribe({
       next : (response) => {
        const ownerId = this.registrationForm.value.id
          // this.ownerService.setOwnerIsRegister(true);
          localStorage.setItem("ownerIsRegister","true")
          localStorage.setItem("ownerID",ownerId)
        this.ownerService.setOwnerIsRegister(this.ownerService.getOwnerIsRegisteredFromLocalStorage());
        this.ownerService.ownerID = localStorage.getItem('ownerID')

          this.router.navigateByUrl('/owner/partnerWithUs');
          
          this.toastr.showSuccess(`welcome ${this.registrationForm.value.name}`,'Login Successfully')
        },
        error :(error) => {
          console.error('Error adding owner:', error);
          this.toastr.showError('Error adding owner','Failed SignUp');
        }
      });
      // console.log(this.registrationForm.value);
      this.registrationForm.reset();
    }
  }

  navigateToLogin() {
    this.dialog.open(OwnerLoginComponent, {
      // Pass any data needed by the dialog here (e.g., hotel data)
    });
  }
  navigateToHomePage() {
    this.router.navigateByUrl('/user');
  }
}
