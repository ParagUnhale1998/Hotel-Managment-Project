import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.scss'],
})
export class AllHotelsComponent {
  allHotelsData: any;
  searchInput: any;
  constructor(private service: AdminService) {}

  ngOnInit(): void {
    const endpoint = 'Allhotels';
    this.service.getUsersOwners(endpoint).subscribe({
      next :(data) => {
        this.allHotelsData = data;
        console.log('User Data Added Succcesful' + data);
      },
    error :  (error) => console.log(error)
  }  );
  }
}
