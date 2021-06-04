import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { UserLogin } from '../../models/user-login.model';
import {AuthenticateService} from '../../services/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin("", "");
  currentUser: User;
  constructor(private _authenticateService: AuthenticateService, private router: Router, private appComponent: AppComponent, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this._authenticateService.isLoggedIn()) {
      this.currentUser = this._authenticateService.getCurrentUser();
      if(this.currentUser.userType.userTypeName === "Boer") {
        this.router.navigate([""])
      }
      if(this.currentUser.userType.userTypeName === "Admin"){
        this.router.navigate(["/admin/home"])
      }
    }
  }

  onSubmit() {
    this._authenticateService.authenticate(this.userLogin).subscribe(result => {
      //localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem('token', result.token);
      this._authenticateService.logUser(result);
      this.appComponent.ngOnInit();

      this.toastr.success('Hello '+ result.firstName, 'Welkom!', {timeOut: 4000, positionClass: 'toast-bottom-center', progressBar: true});
      //console.log("ingelogde user", result)
      if (result.userType.userTypeName === "Boer") {
        this.router.navigate(['/dashboard']);
      }
      if (result.userType.userTypeName === "Admin") {
        this.router.navigate(["admin/home"])
      }
    })
  }

}
