import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Box } from 'src/app/models/box.model';
import { SensorBox } from 'src/app/models/sensor-box.model';
import { User } from 'src/app/models/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { BoxUser } from '../../models/box-user.model';
import { BoxUserService } from '../../services/box-user.service';
import { BoxService } from '../../services/box.service';
import { SensorBoxService } from '../../services/sensor-box.service';
import { MeasurementService } from '../../services/measurement.service';
//import { Measurement } from 'src/app/models/measurement.model';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  boxUsers: BoxUser[];
  currentUser: User;
  boxes: Box[] = [];
  selectedBox: Box;
  selectedBoxUser: BoxUser;
  sensorboxes: SensorBox[] = [];
  long: string;
  lat: string;
  urlMaps: string;
  index: number = 0;

  sensorName: string = "";

  constructor(private router: Router, private _boxUserService: BoxUserService, private _authenticateService: AuthenticateService,
    private _boxService: BoxService, private _sensorBoxService: SensorBoxService, private _measurementService: MeasurementService,
    private _spinner: NgxSpinnerService) {
  }

  // goMonitoring():void{
  //   this.router.navigate(['/monitoring',
  //     {
  //       //nodig: boxid mee doorsturen

  //     }
  //   ])
  // }


  goDetailSensor(sensorID, boxID, sensorTypeName, sensorTypeUnit, sensorTimestamp) {
    this.router.navigate(['/detailmain',
      {
        sensorID: sensorID,
        boxID: boxID,
        sensorTypeName: sensorTypeName,
        sensorTypeUnit: sensorTypeUnit,
        sensorTimestamp: sensorTimestamp
      }
    ])
  }

  goTerrascope(boxID) {
    this.router.navigate(['/terrascope',
      {
        boxID: boxID
      }
    ])
  }

  getSensorBoxesandMeasurements() {
    if (this.selectedBox) {
      this._sensorBoxService.getSensorBoxesByBoxID(this.selectedBox.boxID).subscribe(result => {
        this.sensorboxes = result;
        //console.log("sensorboxes", this.sensorboxes);
        //measurements hier nog ophalen
        this.sensorboxes.forEach(item => {
          this._measurementService.getLatestMeasurement(item.boxID, item.sensorID).subscribe(result => {
            item["measurementValue"] = result.value;
            item["timestamp"] = result.timeStamp;
            //console.log(result)
            this._spinner.hide();
          })
        })
      })
    }
  }

  onChangeSelect(boxindex) {
    //console.log("index", boxindex)
    this.selectedBox = this.boxes[+boxindex];
    //console.log("selected box na change", this.selectedBox);
    this.getSensorBoxesandMeasurements();
    this.selectedBoxUser = this.boxUsers[+boxindex]
    //console.log("selected box user", this.selectedBoxUser)
    if(this.selectedBoxUser.locations[0]){
      this.urlMaps = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbJClz1HmVAs_WdoFqrOfk7r8QZnaRAjE&q=" + this.selectedBoxUser.locations[0].latitude + ", " + this.selectedBoxUser.locations[0].longitude + "&center=" + this.selectedBoxUser.locations[0].latitude + ", " + this.selectedBoxUser.locations[0].longitude + "&zoom=17&maptype=satellite"

    }
    if(!this.selectedBoxUser.locations[0]){
      this.urlMaps = null;
    }
    //console.log('maps url', this.urlMaps)
  }

  ngOnInit(): void {
    this._spinner.show();
    //console.log("index", +this.index)
    this.currentUser = this._authenticateService.getCurrentUser();
    this.boxUsers = [];
    this._boxUserService.getBoxUsersByUserID(this.currentUser.userID).subscribe(result => {
      this.boxUsers = result;
      //console.log("boxusers", this.boxUsers);
      this.selectedBoxUser = this.boxUsers[0];
      if(this.selectedBoxUser.locations[0]){
        this.urlMaps = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbJClz1HmVAs_WdoFqrOfk7r8QZnaRAjE&q=" + this.selectedBoxUser.locations[0].latitude + ", " + this.selectedBoxUser.locations[0].longitude + "&center=" + this.selectedBoxUser.locations[0].latitude + ", " + this.selectedBoxUser.locations[0].longitude + "&zoom=17&maptype=satellite"

      }
      if(!this.selectedBoxUser.locations[0]){
        this.urlMaps = null;
      }
      //console.log("selectedboxuser", this.selectedBoxUser)
      //console.log('maps url init', this.urlMaps)
      this.boxes = [];
      this.boxUsers.forEach(item => {
        this._boxService.getBox(item.boxID).subscribe(result => {
          this.boxes.push(result);
          //console.log("boxes", this.boxes)
          this.selectedBox = this.boxes[+this.index];
          //console.log("selectedbox", this.selectedBox)
          this.getSensorBoxesandMeasurements();
        })
        //console.log("boxes in foreach", this.boxes)
      })

    })

  }

}
