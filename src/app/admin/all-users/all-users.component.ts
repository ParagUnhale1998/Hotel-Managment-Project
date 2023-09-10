import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  allUserData: any;
  searchInput: any;
  constructor(private service: AdminService) {}

  ngOnInit(): void {
    const endpoint = 'user';
    this.service.getUsersOwners(endpoint).subscribe({
    next :  (data) => {
        this.allUserData = data;
        console.log('User Data Added Succcesful');
      },
     error : (error) => console.log(error)
  });
  }
}
