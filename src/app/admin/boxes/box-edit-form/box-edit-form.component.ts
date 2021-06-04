import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoxUser } from 'src/app/models/box-user.model';
import { Box } from 'src/app/models/box.model';
import { SensorBox } from 'src/app/models/sensor-box.model';
import { Sensor } from 'src/app/models/sensor.model';
import { User } from 'src/app/models/user.model';
import { BoxUserService } from 'src/app/services/box-user.service';
import { BoxService } from 'src/app/services/box.service';
import { SensorBoxService } from 'src/app/services/sensor-box.service';
import { SensorService } from 'src/app/services/sensor.service';
import { UserService } from 'src/app/services/user.service';
import { BoxesComponent } from '../boxes.component';

@Component({
  selector: 'app-box-edit-form',
  templateUrl: './box-edit-form.component.html',
  styleUrls: ['./box-edit-form.component.scss']
})
export class BoxEditFormComponent implements OnInit {
  id: any = this._activatedroute.snapshot.paramMap.get("id");
  box: Box;
  sensorboxes: SensorBox[];
  sensors: Observable<Sensor[]>;
  users: Observable<User[]>;
  gebruikers;
  selectedUser;
  selectedUserOriginal;
  sensorArrayForCheckbox: Sensor[] = []
  selectedSensors: Sensor[] = [];
  selectedSensorsOriginal: Sensor[] = [];
  addBoxStart: boolean = true;
  addSensor: boolean = false;
  addUser: boolean = false;
  constructor(private _activatedroute: ActivatedRoute, private router: Router, private _sensorService: SensorService, private _boxService: BoxService,
    private _userService: UserService, private _sensorBoxService: SensorBoxService, private _userBoxService: BoxUserService, private boxComponent: BoxesComponent) { }

  ngOnInit(): void {
    //console.log("id", this.id)
    this._boxService.getBox(this.id).subscribe(result => {
      this.box = result;
      //console.log("box", this.box);
      if (this.box.boxUsers[0]) {
        this.selectedUser = this.box.boxUsers.find(x => x.endDate == null).userID
        //console.log("selectedUser", this.selectedUser)
        this.selectedUserOriginal = this.box.boxUsers.find(x => x.endDate == null).userID
      }

      this._sensorBoxService.getSensorBoxesByBoxID(this.box.boxID).subscribe(result => {
        this.sensorboxes = result;

        var bar = new Promise<void>((resolve, reject) => {
          this.sensorboxes.forEach(item => {
            this.selectedSensors.push(item.sensor);
            this.selectedSensorsOriginal.push(item.sensor);
            resolve();
          });

        });

        bar.then(() => {
          //console.log('All done!', this.selectedSensors);
          if (this.selectedSensors) {
            //console.log("test1")
            for (var i = 0; i < this.sensorArrayForCheckbox.length; i++) {
              //console.log("test2")
              for (var j = 0; j < this.selectedSensors.length; j++) {
                //console.log("test3", this.sensorArrayForCheckbox[i].sensorID, this.selectedSensors[j].sensorID)
                //console.log(this.sensorArrayForCheckbox[i].sensorID === this.selectedSensors[j].sensorID)
                if (this.sensorArrayForCheckbox[i].sensorID === this.selectedSensors[j].sensorID) {
                  this.sensorArrayForCheckbox[i]["active"] = true;
                  //console.log(this.sensorArrayForCheckbox)
                }
              }
            }
          }


        });

      });
    });

    this.getSensors();
    this.getUsers();
  }

  //Get sensors to add to box and users for dropdown for the owner
  getSensors() {
    this.sensors = this._sensorService.getSensors();
    this.sensors.subscribe(result => {
      this.sensorArrayForCheckbox = result
    });
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
  updateBox() {
    this._boxService.updateBox(this.box.boxID, this.box).subscribe(result => {
      this.addBoxStart = false;
      this.addSensor = true;
    })
  }

  //Second page, user can add sensors to the box
  onCheckboxChange(sensor, event) {
    delete sensor.active;
    if (event.target.checked) {
      this.selectedSensors.push(sensor);
    } else {
      for (var i = 0; i < this.sensorArrayForCheckbox.length; i++) {

        if (this.selectedSensors[i]) {
          //console.log(this.selectedSensors[i].sensorID, sensor.sensorID)
          if (this.selectedSensors[i].sensorID == sensor.sensorID) {
            this.selectedSensors.splice(i, 1);
          }
        }

      }
    }
    //console.log(this.selectedSensors);
  }

  addSensorBox() {
    var bar = new Promise<void>((resolve, reject) => {
      this.selectedSensorsOriginal.forEach(item => {
        this._sensorBoxService.deleteSensorBox(this.box.boxID, item.sensorID).subscribe(result => {
          resolve();
        })
      });
    });

    bar.then(() => {
      if (this.selectedSensors.length > 0) {
        this.selectedSensors.forEach(item => {
          var sensorbox = new SensorBox(this.box.boxID, item.sensorID)
          this._sensorBoxService.addSensorBox(sensorbox).subscribe();
        })
      }
    });



    this.addSensor = false;
    this.addUser = true;
  }

  //third page, user can add a user to the box
  addUserBox() {
    //User is still the same
    if (this.selectedUser == this.selectedUserOriginal) {
      this.router.navigate(['/admin/boxes'])
    }

    if (this.selectedUser) {
      //user has changed
      if (this.selectedUser != this.selectedUserOriginal) {
        //console.log(this.selectedUser)

        //First put enddate on current boxuser
        if (this.box.boxUsers.find(x => x.endDate == null)) {
          var boxuser = this.box.boxUsers.find(x => x.endDate == null);
          var date = new Date();
          boxuser.endDate = date;

          this._userBoxService.updateBoxUser(boxuser.boxUserID, boxuser).subscribe(result => {
            var date = new Date();
            //console.log(date);
            var userBoxToAdd = new BoxUser(this.box.boxID, +this.selectedUser, date, null)
            //console.log(userBoxToAdd)
            this._userBoxService.addBoxUser(userBoxToAdd).subscribe(result => {
              this.test();
            });
          })
        }
        else {
          var date = new Date();
          //console.log(date);
          var userBoxToAdd = new BoxUser(this.box.boxID, +this.selectedUser, date, null)
          //console.log(userBoxToAdd)
          this._userBoxService.addBoxUser(userBoxToAdd).subscribe(result => {
            this.test();
          });
        }
      }
    }
    this.test();
  }

  deleteUserBox() {
    if (this.selectedUser) {
      var boxuser = this.box.boxUsers[0];
      var date = new Date();
      boxuser.endDate = date;
      this._userBoxService.updateBoxUser(boxuser.boxUserID, boxuser).subscribe(result => {
        this.test();
      })
    }
    if (!this.selectedUser) {
      this.test();
    }
  }

  test() {
    this.boxComponent.ngOnInit();
    this.router.navigate(['/admin/boxes']);
  }
}
