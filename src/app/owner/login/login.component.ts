import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class OwnerLoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgetPasswordForm!: FormGroup;
  showForgetPassword = false;
  showChangePassword = false;
  ownersAll: any;
  ownerFoundData: any;
  ownerNotFound = false;
  result: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OwnerLoginComponent>,
    private ownerService: OwnerService,
    private router: Router,
    private toastr: TosterMessagesService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initForgetPassForm();
    this.getAllOwners();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initForgetPassForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      phoneNO: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  getAllOwners() {
    this.ownerService.getOwner().subscribe(
      (owners) => {
        this.ownersAll = owners;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      this.ownerService.getOwnerById(this.loginForm.value.username).subscribe(
        (item) => {
          this.result = item;

          if (this.result.password === this.loginForm.value.password) {
            const ownerId = this.loginForm.value.username;
            localStorage.setItem("ownerIsRegister","true")
              localStorage.setItem("ownerID",ownerId)
            this.ownerService.setOwnerIsRegister(this.ownerService.getOwnerIsRegisteredFromLocalStorage());
            this.ownerService.ownerID = localStorage.getItem('ownerID')
            // this.ownerService.setOwnerIsRegister(true);
            this.router.navigateByUrl('/owner/partnerWithUs');
            this.toastr.showSuccess(
              `welcome ${this.loginForm.value.username}`,
              'Login Successfully !!'
            );
            // alert('loginSuccesfull')
            this.ownerService.ownerID = this.loginForm.value.username;
            // console.log(this.ownerService.ownerID)
            this.dialogRef.close();
          } else {
            console.log('errs');
          }
        },
        (error) => {
          this.toastr.showError('User Not Found', 'Failed Login');
        }
      );
    } else {
      this.toastr.showError(
        'Please Enter Something || Relogin',
        'Failed Login'
      );
    }
  }

  close() {
    this.dialogRef.close();
  }

  confirmForget() {
    this.showForgetPassword = true;
  }

  confirmPhoneNo() {
    const phoneNo = parseInt(this.forgetPasswordForm.value.phoneNO); // Convert to number
    this.ownerFoundData = this.ownersAll.find(
      (owner: any) => owner.phoneNO === phoneNo
    );
    console.log(this.ownersAll);
    // this.ownerNotFound = !this.owner;
    if (this.ownerFoundData) {
      this.showForgetPassword = false;
      this.showChangePassword = true;
    } else {
      this.toastr.showWarning('Not Found Owner', 'Failed Login');
    }
  }

  onChangePasswordSubmit() {
    if (this.ownerFoundData) {
      const ownerId = this.ownerFoundData.id;
      const newPassword = this.forgetPasswordForm.value.newPassword;
      this.ownerService.updateOwnerPassword(ownerId, newPassword).subscribe(
        (response) => {
          console.log('Password updated successfully:', response);
          this.toastr.showSuccess(
            'Password updated successfully',
            'successfull'
          );
          this.forgetPasswordForm.reset();
          this.backtoLogin();
        },
        (error) => {
          console.error('Error updating password:', error);
        }
      );
    }
  }

  backtoLogin() {
    this.showForgetPassword = false;
    this.showChangePassword = false;
  }
}
