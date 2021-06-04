import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { SensorType } from 'src/app/models/sensor-type.model';
import { Sensor } from 'src/app/models/sensor.model';
import { UserType } from 'src/app/models/user-type.model';
import { User } from 'src/app/models/user.model';
import { SensorService } from 'src/app/services/sensor.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from 'src/app/services/user.service';
import { SensorTypeService } from '../../../services/sensor-type.service';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.scss']
})
export class SensorFormComponent implements OnInit {

  id: any = this._activatedroute.snapshot.paramMap.get("id");
  sensor:Sensor = new Sensor("", 1);
  sensorType: SensorType = new SensorType("", "");
  newSensor: boolean = true;
  sensorTypes: Observable<SensorType[]>;
  newSensorType: boolean = false;
  constructor(private _activatedroute: ActivatedRoute, private router: Router, private _sensorTypeService: SensorTypeService, private _sensorService: SensorService) { }

  ngOnInit(): void {
    //console.log("id", this.id)
    if(this.id != "new"){
      this._sensorService.getSensor(this.id).subscribe(result => {
        this.sensor = result;
        //console.log(this.sensor)
      })
      this.newSensor = false;
    }
    if(this.id == "new") {
      this.sensor = new Sensor("", 1);
    }
    this.getSensorTypes();
  }

  getSensorTypes() {
    this.sensorTypes = this._sensorTypeService.getSensorTypes();
  }

  addSensorTypeB() {
    this.newSensorType = true;
  }

  addSensorType() {
    //console.log("sensorType", this.sensorType)
    this._sensorTypeService.addSensorType(this.sensorType).subscribe(result => {
      this.newSensorType = false;
      this.getSensorTypes();
    })
  }
  addSensor(){
    this.sensor.sensorTypeID = +this.sensor.sensorTypeID
    //console.log("sensorAdd", this.sensor)
    this._sensorService.addSensor(this.sensor).subscribe(result => {
      this.router.navigate(["/admin/sensors"])
    });

  }
  editSensor() {
    this.sensor.sensorTypeID = +this.sensor.sensorTypeID
    this.sensor.sensorType = null;
    //console.log(this.sensor)
    this._sensorService.updateSensor(this.sensor.sensorID, this.sensor).subscribe(result => {
      this.router.navigate(["/admin/sensors"])
    })
  }
  faShareSquare=faShareSquare;

}
