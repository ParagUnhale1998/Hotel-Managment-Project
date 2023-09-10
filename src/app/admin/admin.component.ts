import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	active = 1;
  adminIsLogin :boolean = false;

 constructor(private router:Router,private service:AdminService){
 }
   
 ngOnInit(): void {
  this.service.adminIsRegister$.subscribe((value) => {
    this.adminIsLogin = value;
 })

}

  logout(){
    localStorage.setItem("adminIsRegister","false")
    this.service.setAdminIsRegister(this.service.getAdminIsRegisteredFromLocalStorage())
  this.router.navigateByUrl('/user')
  // this.service.setAdminIsRegister(false);
  
  // console.log(this.service.getAdminIsRegister())

  }
}
