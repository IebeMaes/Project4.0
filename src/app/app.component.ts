import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticateService } from './services/authenticate.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BioT-Front';
  currentUser: User;
  isLoggedIn: boolean = false;
  constructor(private _authenticateService: AuthenticateService) {

  }
  faCoffee = faCoffee;
  logout() {
    this._authenticateService.logout();
    this.ngOnInit();
  }

  ngOnInit() {
    this._authenticateService.loggedUser.subscribe(
      result => {
        this.isLoggedIn = this._authenticateService.isLoggedIn();
        if(this.isLoggedIn){
          //console.log('User is authenticated, get the current user');
        }
        this.currentUser = result;

      }
    );
  }
}
