import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OwnerLoginComponent } from 'src/app/owner/login/login.component';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showSignUp: boolean = false;
  showLogin: boolean = true;
  userData: any;
  userId :any ;
  constructor(
    private builder: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastrService: TosterMessagesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  submitLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
       const id = this.loginForm.value.id
      this.service.getUserByCode(this.loginForm.value.id).subscribe(
        (item) => {
          this.userData = item;
            //  this.service.Userpassword =this.userData.password;//for confirm booking
            if (this.userData.password === this.loginForm.value.password) {
              this.userId = id;
              localStorage.setItem("UserIsRegister","true")
              localStorage.setItem("userId",this.userId)
              localStorage.setItem("userpassword",this.userData.password)
              this.service.userId = localStorage.getItem('userId')
              this.service.setUserIsRegister(this.service.getUserIsRegisteredFromLocalStorage());
              this.service.Userpassword = localStorage.getItem('userpassword')
            // console.log(id)
            this.snackBar.open('Login Successful', 'Dismiss', {
              duration: 1000, // The duration for which the pop-up will be visible (in milliseconds)
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            this.router.navigateByUrl('/user');
          } else {
            this.toastrService.showWarning(
              'Please check the password',
              'Warning'
            );
            localStorage.setItem("UserIsRegister","false")
            localStorage.setItem("userId",'')
          }
        },
        (error) => {
          this.toastrService.showError('User not found', 'Error');
          console.error(error);
        }
      );
    } 
    else {
      this.toastrService.showWarning(
        'Please Enter Something in fields',
        'Warning'
      );
    }
  }

  showSignUpForm() {
    this.showSignUp = !this.showSignUp;
    this.showLogin = !this.showLogin;
  }
  showloginpage() {
    this.showSignUp = !this.showSignUp;
    this.showLogin = !this.showLogin;
  }
  navigateToLogin() {
    this.dialog.open(OwnerLoginComponent, {
      // Pass any data needed by the dialog here (e.g., hotel data)
    });
  }
}
