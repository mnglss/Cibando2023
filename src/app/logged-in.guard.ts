import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';


/* export const loggedInGuard: CanActivateFn = (route, state) => {

  return true;
};  */




@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLogged()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
