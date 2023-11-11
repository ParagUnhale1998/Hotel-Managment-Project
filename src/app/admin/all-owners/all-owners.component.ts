import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-owners',
  templateUrl: './all-owners.component.html',
  styleUrls: ['./all-owners.component.scss'],
})
export class AllOwnersComponent {
  allOwnerData: any;
  searchInput: any;
  constructor(private service: AdminService) {}

  ngOnInit(): void {
    const endpoint = 'owner';
    this.service.getUsersOwners(endpoint).subscribe({
      next: (data) => {
        this.allOwnerData = data;
        console.log('User Data Added Succcesful' + data);
      },
      error: (error) => console.log(error),
    });
  }
}
