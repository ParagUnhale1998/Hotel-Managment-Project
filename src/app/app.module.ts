import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './common/home/home.component';
import { SharedModule } from './shared/shared.module';
import { OwnerModule } from './owner/owner.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app'

const firebaseConfig = {
  apiKey: "AIzaSyCtnohtjpAUJhoqrdvD7cGkLhkbZCxEwGc",
  authDomain: "hotel-management-88cb3.firebaseapp.com",
  projectId: "hotel-management-88cb3",
  storageBucket: "hotel-management-88cb3.appspot.com",
  messagingSenderId: "872177682786",
  appId: "1:872177682786:web:dacb1c5903f5818fef043b"
};

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    OwnerModule,
    AdminModule,
    UserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(()=> initializeApp(firebaseConfig)),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtnohtjpAUJhoqrdvD7cGkLhkbZCxEwGc",
  authDomain: "hotel-management-88cb3.firebaseapp.com",
  projectId: "hotel-management-88cb3",
  storageBucket: "hotel-management-88cb3.appspot.com",
  messagingSenderId: "872177682786",
  appId: "1:872177682786:web:dacb1c5903f5818fef043b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/