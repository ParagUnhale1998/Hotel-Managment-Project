import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isMatch!: boolean;
  isValid!: any;
  whiteSpace: boolean = false;
  displayOtherContent: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private tosterService: TosterMessagesService
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        this.whiteSpaceValidator,
      ]),
      lastName: new FormControl('', [
        Validators.required,
        this.whiteSpaceValidator,
      ]),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.whiteSpaceValidator,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
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
      this.signUpForm.get('password')?.value ===
      this.signUpForm.get('confirmPassword')?.value;
  }

  submitSignUp() {
    if (this.signUpForm.valid) {
      console.log('Form data submitted valid:', this.signUpForm.value);
      this.userService.postUsers(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res);
          const id = this.signUpForm.value.id
          const password = this.signUpForm.value.password
          // this.userService.setUserIsRegister(true);
          localStorage.setItem("UserIsRegister","true")
          localStorage.setItem("userId",id)
          localStorage.setItem("userpassword",password)
          this.userService.userId = localStorage.getItem('userId')
          this.userService.setUserIsRegister(this.userService.getUserIsRegisteredFromLocalStorage());
          this.userService.Userpassword = localStorage.getItem('userpassword')

          this.router.navigateByUrl('/user');
          this.tosterService.showError(
            'User registered successfully',
            'Success'
          );
        },
        error: (err) => {
          this.tosterService.showError(
            'An error occurred while registering user',
            'Error'
          );
          console.log(err);

        },
      });
    }else {
      this.tosterService.showError('Please fill in all required fields correctly', 'Error');
    }
  }
}

//  ConfirmPass(){
//   console.log(this.signUpForm.value.confirmPassword)
//   this.confirmPass = this.signUpForm.value.confirmPassword ;
//   if(this.inputPassword ===  this.confirmPass){
//      this.isMatch = true;
//   }else{
//     this.isMatch = false
//   }
//  }
/*
  
  checkCurrentUrl() {
    const currentUrl = this.router.url;
    if (currentUrl === '/user/signUp') {
      this.displayOtherContent = true;
      console.log(this.displayOtherContent  )
    } else {
      this.displayOtherContent = false;
    }
  }


   navigateLoginPage(){
    this.router.navigateByUrl('user/login')
  }

     showPass(){
    console.log(this.signUpForm.value.password)
    this.inputPassword = this.signUpForm.value.password ;
   }


   initializeForm() {
    this.signUpForm = new FormGroup({
      id: new FormControl(null, [Validators.required, Validators.minLength(5), this.whiteSpaceValidator]),
      firstName: new FormControl(null, [Validators.required, this.whiteSpaceValidator]),
      lastName: new FormControl(null, [Validators.required, this.whiteSpaceValidator]),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }
  */
