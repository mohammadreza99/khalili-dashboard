import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  canActivateChild() {
    if (this.authService.isAuthenticated()) return true;
    else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
  canActivate() {
    if (this.authService.isAuthenticated()){
      return true;
    } 
    else {

      this.router.navigate(['/auth']);
      return false;
    }
  }
}
