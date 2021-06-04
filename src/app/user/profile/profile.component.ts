import { Component, OnInit } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  changepw: boolean = false;
  fullname: string;
  pw1: string = "";
  pw2: string = "";
  disable: boolean = true;
  samepw: boolean= true;
  constructor(private _authenticateService: AuthenticateService, private _userService: UserService) { }

  ngOnInit(): void {
    this.user = this._authenticateService.getCurrentUser();
    if(this.user) {
      this.fullname = this.user.firstName + ' ' + this.user.lastName;
    }

  }

  edit(){
    this.disable = false;
  }

  changePassword() {
    this.changepw = true;
  }
  checkpw() {
    //console.log(this.samepw)
    if(this.pw1 == this.pw2){
      this.samepw = true
    }
    if(this.pw1 != this.pw2){
      this.samepw = false
    }
  }

  update(){
    if(this.pw1 == this.pw2) {
      this.user.password = this.pw1;

      //console.log(this.user);
    this._userService.updateUser(this.user.userID, this.user).subscribe(result => {
      this._userService.getUser(this.user.userID).subscribe(val => {
        localStorage.setItem("currentUser", JSON.stringify(val));
        this.ngOnInit()
      })
    });
    this.disable = true;
    this.changepw = false;

    }
    else {
      alert("wrong password")
    }

  }

}
