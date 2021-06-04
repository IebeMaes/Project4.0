import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/box.model';
import { SensorType } from 'src/app/models/sensor-type.model';
import { Sensor } from 'src/app/models/sensor.model';
import { User } from 'src/app/models/user.model';
import { BoxService } from 'src/app/services/box.service';
import { SensorTypeService } from 'src/app/services/sensor-type.service';
import { SensorService } from 'src/app/services/sensor.service';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { SensorBoxService } from 'src/app/services/sensor-box.service';
import { BoxUserService } from 'src/app/services/box-user.service'
import { BoxUser } from 'src/app/models/box-user.model';
import { SensorBox } from 'src/app/models/sensor-box.model';

//format off date
import { formatDate, registerLocaleData } from "@angular/common";
import localeNL from "@angular/common/locales/nl-BE";
registerLocaleData(localeNL, "nl");


@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss']
})
export class BoxFormComponent implements OnInit {
  box: Box = new Box("", "", "", true);
  sensors: Observable<Sensor[]>;
  users: Observable<User[]>;
  gebruikers;
  selectedUser;
  sensorArrayForCheckbox: Sensor[] = []
  selectedSensors: Sensor[] = [];
  addBoxStart: boolean = true;
  addSensor: boolean = false;
  addUser: boolean = false;
  constructor(private _activatedroute: ActivatedRoute, private router: Router, private _sensorService: SensorService, private _boxService: BoxService,
    private _userService: UserService, private _sensorBoxService: SensorBoxService, private _userBoxService: BoxUserService) { }

  ngOnInit(): void {

    this.box = new Box("", "", "", true);
    this.getSensors();
    this.getUsers();
    //console.log(this.gebruikers)
    this.sensors.subscribe(result => {
      //console.log(result)
    })
  }

  getSensors() {
    this.sensors = this._sensorService.getSensors();
    this.sensors.subscribe(result => {
      this.sensorArrayForCheckbox = result
    })
  }
  getUsers() {
    this.users = this._userService.getUsers();
    this.gebruikers = this.users.pipe(
      map(users => users.filter(
        (user: User) => user.userTypeID == 3
      ))
    );
  }

  //First page, user adds a box
  addBox() {
    this._boxService.addBox(this.box).subscribe(result => {
      this.box = result;
      //console.log("box na add", this.box);
      this.addBoxStart = false;
      this.addSensor = true;
    })
  }

  //Second page, user can add sensors to the box
  onCheckboxChange(sensor, event) {
    if (event.target.checked) {
      this.selectedSensors.push(sensor);
    } else {
      for (var i = 0; i < this.sensorArrayForCheckbox.length; i++) {
        if (this.selectedSensors[i] == sensor) {
          this.selectedSensors.splice(i, 1);
        }
      }
    }
    //console.log(this.selectedSensors);
  }

  addSensorBox() {
    if (this.selectedSensors.length > 0) {
      this.selectedSensors.forEach(item => {
        var sensorbox = new SensorBox(this.box.boxID, item.sensorID)
        this._sensorBoxService.addSensorBox(sensorbox).subscribe();
      })
    }

    this.addSensor = false;
    this.addUser = true;
  }

  //third page, user can add a user to the box
  addUserBox() {
    //console.log(this.selectedUser)
    if (this.selectedUser) {
      var date = new Date();
      //console.log(date);
      var userBoxToAdd = new BoxUser(this.box.boxID, +this.selectedUser, date, null)
      //console.log(userBoxToAdd)
      this._userBoxService.addBoxUser(userBoxToAdd).subscribe();

    }
    this.router.navigate(['/admin/boxes'])
  }

  faShareSquare = faShareSquare;

}
