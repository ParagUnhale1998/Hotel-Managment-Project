import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    // false
    // true
    this.getAdminIsRegisteredFromLocalStorage()
  );
  adminIsRegister$ = this.adminIsRegister.asObservable();

  setAdminIsRegister(value: boolean) {
    this.adminIsRegister.next(value);
  }

  getAdminIsRegister(): boolean {
    return this.adminIsRegister.getValue();
  }
 
  getAdminIsRegisteredFromLocalStorage(): boolean {
    const storedValue = localStorage.getItem('adminIsRegister');
    return storedValue === 'true';
  }


   private url = 'http://localhost:3000/'

   constructor(private http: HttpClient) {}

   getAdmin(id: any) {
    // return this.http.get(this.url + 'admin/' + id);
    return this.http.get('https://hoteldata.onrender.com/admin/' + id);
  }
   
  getUsersOwners(endpoint:any) {
    // return this.http.get(this.url + endpoint);
    return this.http.get('https://hoteldata.onrender.com/' + endpoint);
  }

  
  }
