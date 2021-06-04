import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { faChevronDown, faChevronUp, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Observable<User[]>
  customClass: string = 'customClass';
  term: string = "";
  constructor(private _userService: UserService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.users = this._userService.getUsers();
    this.users.subscribe(result => {
      this.spinner.hide();
    })
  }

  goUserForm(userID){
    this.router.navigate(["/admin/users/userform", {id: userID}]);
  }
  deleteUser(userID){
    this._userService.deleteUser(userID).subscribe(result => {
      this.ngOnInit()
    })
  }

  faChevronDown=faChevronDown;
  faChevronUp=faChevronUp;
  faPlus=faPlus;
  faPlusSquare=faPlusSquare;

}
