import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sensor } from 'src/app/models/sensor.model';
import { SensorService } from 'src/app/services/sensor.service';
import { faChevronDown, faChevronUp, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  sensors: Observable<Sensor[]>
  customClass: string = 'customClass';
  term: string = "";
  constructor(private _sensorService: SensorService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //how to use spinner:
    //first import the NgxSpinnerService and instantiate in constructor
    //to open spinner: spinner.show(), to hide: spinner.hide()
    //then add the <ngx-spinner> tag in html
    this.spinner.show();
    this.sensors = this._sensorService.getSensors();
    //console.log("sensors", this.sensors);
    this.sensors.subscribe(result => {
      //console.log("test", result)
      this.spinner.hide();
    })
  }

  goSensorForm(sensorID){
    this.router.navigate(["/admin/sensors/sensorform", {id: sensorID}]);
  }

  deleteSensor(sensorID){
    this._sensorService.deleteSensor(sensorID).subscribe(result => {
     this.ngOnInit()
    })
  }

  faChevronDown=faChevronDown;
  faChevronUp=faChevronUp;
  faPlus=faPlus;
  faPlusSquare=faPlusSquare;

}
