import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { UserType } from 'src/app/models/user-type.model';
import { UserTypeService } from '../../../services/user-type.service';
import { Observable } from 'rxjs';
// declare var require: any
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  id: any = this._activatedroute.snapshot.paramMap.get("id");
  user: User = new User("", "", "", "", "", "", "", 1)
  pw1: string = "";
  pw2: string = "";
  samepw: boolean= true;
  newUser: boolean = true;
  userTypes: Observable<UserType[]>;
  constructor(private _activatedroute: ActivatedRoute, private _userService: UserService, private router: Router, private _userTypeService: UserTypeService) { }

  ngOnInit(): void {
    //console.log("id", this.id)
    if(this.id != "new"){
      this._userService.getUser(this.id).subscribe(result => {
        this.user = result;
        //console.log(this.user)
      })
      this.newUser = false;
    }
    if(this.id == "new") {
      this.user = new User("", "", "", "", "", "", "", 3);
    }
    this.userTypes = this._userTypeService.getUserTypes();
  }

  generatePw() {
    var Password = {

      _pattern : /[a-zA-Z0-9_\-\+\.]/,


      _getRandomByte : function()
      {
        // http://caniuse.com/#feat=getrandomvalues
        if(window.crypto && window.crypto.getRandomValues)
        {
          var result = new Uint8Array(1);
          window.crypto.getRandomValues(result);
          return result[0];
        }
        else if(window.crypto && window.crypto.getRandomValues)
        {
          var result = new Uint8Array(1);
          window.crypto.getRandomValues(result);
          return result[0];
        }
        else
        {
          return Math.floor(Math.random() * 256);
        }
      },

      generate : function(length)
      {
        return Array.apply(null, {'length': length})
          .map(function()
          {
            var result;
            while(true)
            {
              result = String.fromCharCode(this._getRandomByte());
              if(this._pattern.test(result))
              {
                return result;
              }
            }
          }, this)
          .join('');
      }

    };
    this.user.password = Password.generate(10);

  }

  addUser(){
    //console.log("useradd", this.user)
    this._userService.addUser(this.user).subscribe();
    this.router.navigate(["/admin/users"])
  }
  editUser() {
    this.user.password = "";
    //console.log(this.user)
    this._userService.updateUser(this.user.userID, this.user).subscribe(result => {
      this.router.navigate(["/admin/users"])
    })
  }
  faShareSquare=faShareSquare;

}
