import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  // constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {}

  // userIsRegister: boolean = this.service.getUserIsRegister();

  // navigetToUserHome() {
  //   this.router.navigateByUrl('/user');
  // }
  // logout() {
  //   console.log(this.userIsRegister);
  //   this.service.setUserIsRegister(false);
  //   this.userIsRegister = this.service.getUserIsRegister();
  //   this.router.navigateByUrl('/user');
  // }
}
