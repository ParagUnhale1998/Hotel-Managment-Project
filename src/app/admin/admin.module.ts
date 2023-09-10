import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { AllOwnersComponent } from './all-owners/all-owners.component';
import { FiltersItemsPipe } from './filters-items.pipe';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    AdminComponent,
    AllUsersComponent,
    AllHotelsComponent,
    AllOwnersComponent,
    FiltersItemsPipe,
    AdminFooterComponent,
    AdminHomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    NgbNavModule, NgbNavModule,
    NgbModule
  ]
})
export class AdminModule { }
