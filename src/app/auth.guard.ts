import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user/user.service';
import { OwnerService } from './owner/owner.service';
import { AdminService } from './admin/admin.service';

export const authGuard: CanActivateFn = (route, state) => {
  let UserIsRegister = localStorage.getItem('UserIsRegister');
  let id = localStorage.getItem('userId');
  const _router = inject(Router);
  const _userisRegister = inject(UserService)
  const _ownerisRegister = inject(OwnerService)
  const _adminisRegister = inject(AdminService)

  // if (UserIsRegister == 'false' && id === '') {
  //   _router.navigateByUrl('user/login')
  //   // window.location.href = '/user'
  //   return false;
  // } else {
  //   return true;
  // }

  if(_userisRegister.getUserIsRegisteredFromLocalStorage()){
    return true;
  }else if(_ownerisRegister.getOwnerIsRegisteredFromLocalStorage()){
    return true;
  }else if(_adminisRegister.getAdminIsRegisteredFromLocalStorage()){
    return true;
  }
  else{
    _router.navigateByUrl('/user')
    return false;
  }

};
