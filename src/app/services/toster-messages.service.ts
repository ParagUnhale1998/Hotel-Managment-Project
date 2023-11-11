import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TosterMessagesService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg1:any,msg2:any,){
    this.toastr.success(
      msg1,
      msg2,
      {
        positionClass: 'toast-top-right',
        timeOut: 2000,
        closeButton: true,
      }
    );
  }
  
  showWarning(msg1:any,msg2:any,){
    this.toastr.warning(
      msg1,
      msg2,
      {
        positionClass: 'toast-top-right',
        timeOut: 2000,
        closeButton: true,
      }
    );
  }

  showError(msg1:any,msg2:any,){
    this.toastr.error(
      msg1,
      msg2,
      {
        positionClass: 'toast-top-right',
        timeOut: 2000,
        closeButton: true,
      }
    );
  }
}
