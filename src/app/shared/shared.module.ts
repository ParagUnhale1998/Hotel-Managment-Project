import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FooterComponent } from '../common/footer/footer.component';
// import { HeaderComponent } from '../common/header/header.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    // HeaderComponent,
    // FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
   
   
  ]
})
export class SharedModule { }
