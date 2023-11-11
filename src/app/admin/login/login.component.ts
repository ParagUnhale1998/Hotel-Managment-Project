import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
// import { ToastrService } from 'ngx-toastr';
import { TosterMessagesService } from 'src/app/services/toster-messages.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;

  adminData: any;

  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private builder: FormBuilder,
    private service: AdminService,
    private toastr: TosterMessagesService
  ) {}

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  submitLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.service.getAdmin(this.loginForm.value.id).subscribe({
        next: (item) => {
          this.adminData = item;

          if (this.adminData.password === this.loginForm.value.password) {
            localStorage.setItem("adminIsRegister","true")
            // this.service.setAdminIsRegister(true);
            this.toastr.showSuccess(`Login Successful`, 'Admin');
            this.offcanvasService.dismiss('Cross click');
            this.service.setAdminIsRegister(this.service.getAdminIsRegisteredFromLocalStorage())
            this.router.navigateByUrl('/admin/adminHome');
          } else {
            this.toastr.showError(`Login Failed`, 'Admin');
          }
        },
        error: (error) => {
          console.error(error);
          this.toastr.showError(`Admin Not Found`, 'Error');
        },
      });
    } else {
    }
  }

  ngAfterViewInit(): void {
    if (this.router.url === '/admin/login' || this.router.url === '/admin') {
      this.openCustomBackdropClass();
    }
  }

  close() {
    this.offcanvasService.dismiss('Cross click');
    this.router.navigateByUrl('/');
  }

  openCustomBackdropClass() {
    this.offcanvasService.open(this.contentTemplate, {
      backdropClass: 'background',
      backdrop: 'static',
    });
  }
}
