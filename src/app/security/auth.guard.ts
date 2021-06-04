import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(private _authenticateService: AuthenticateService, private router: Router) {
    this._authenticateService.loggedUser.subscribe(user => {
      this.user = user;
      //console.log("user in authguard", user);
      //console.log(this.user.userType["userTypeName"])
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.data.roles) {
      if (!this.user) {
        this.router.navigate(['/login']); // Redirect user to home page if he is not authenticated
      }
      if (next.data.roles.includes(this.user.userType["userTypeName"])) {
        return true;
      } else {
        this.router.navigate(['/login']); // Redirect user to home page if he is not authenticated
      }
    } else if (this._authenticateService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect user to home page if he is not authenticated
    }
  }

}
