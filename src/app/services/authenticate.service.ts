import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../models/user-login.model';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})


export class AuthenticateService {
  private loggedInUser = new BehaviorSubject(this.getCurrentUser());
  loggedUser = this.loggedInUser.asObservable();
  currentUser: User;
  isLoggedin = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient, private router: Router) {
  }
  

  logUser(user: User) {
    this.loggedInUser.next(user);
  }

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    if (localStorage.getItem("currentUser")) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      return JSON.parse(localStorage.getItem("currentUser"));
    }
    else {
      return null;
    }
  }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>("https://biot-api.azurewebsites.net/api/Users1/authenticate", userLogin).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(user.token))
      //this.currentUserSubject.next(user);
      return user;
    }));

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}​​
