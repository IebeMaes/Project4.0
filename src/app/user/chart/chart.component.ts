import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoxUser } from 'src/app/models/box-user.model';
import { Measurement } from 'src/app/models/measurement.model';
import { Meting } from 'src/app/models/meting.model';
import { User } from 'src/app/models/user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { BoxUserService } from 'src/app/services/box-user.service';
import { MeasurementService } from 'src/app/services/measurement.service';
import { DataService } from '../data.service';
import { faArrowRight, faWindowClose, faEye, faChartLine, faChartPie, faBraille } from '@fortawesome/free-solid-svg-icons';

import { NgxSpinnerService } from "ngx-spinner";

import * as moment from 'moment';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  //chart settings
  public options: any;


  testBool: boolean = false;
  averageBool: boolean = false;
  showdayNightSettings: boolean = false;

  //font awesome used icons
  faArrowRight = faArrowRight;
  faWindowClose = faWindowClose;
  faEye = faEye;
  faChartLine = faChartLine;
  faChartPie = faChartPie;
  faScatter = faBraille;

  //ingelezen data
  measurements: Observable<Measurement[]>;

  boxUsers: Observable<BoxUser[]>;
  currentUser: User;
  currentBoxUser: BoxUser;

  dagUur: number = 7;
  nachtUur: number = 17;
  hours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  graphTypes: string[] = ['scatter', 'line', 'bar'];

  ingelezen: number[] = [];
  metingen: Meting[] = [];
  MetingenArray: [[number, number]] = [[0, 0]];
  gemiddelde: number = 0;
  gemiddeldeNacht: number = 0;
  nachtCount: number = 0;
  dagCount: number = 0;
  gemiddeldeDag: number = 0;

  //(for) user selected variables
  daysAverage: number[] = [1, 2, 5, 10, 30];
  selectedDaysAverage: number = 30;
  selectedGraphType: string = "line";

  sensorID: any = this._activatedroute.snapshot.paramMap.get("sensorID");
  boxID: any = this._activatedroute.snapshot.paramMap.get("boxID");
  sensorTypeName: any = this._activatedroute.snapshot.paramMap.get("sensorTypeName");
  sensorTypeUnit: any = this._activatedroute.snapshot.paramMap.get("sensorTypeUnit");
  sensorTimestampLatestRecorded: any = this._activatedroute.snapshot.paramMap.get("sensorTimestamp");



  constructor(private _activatedroute: ActivatedRoute, private _dataService: DataService,
    private _authenticateService: AuthenticateService, private _boxUserService: BoxUserService,
    private _measurementService: MeasurementService, private _spinner: NgxSpinnerService) {

    //option setting for chart
    this.options = {

      //correctie tijdzone
      time: {
        timezoneOffset: - 1 * 60
      },
      chart: {
        zoomType: 'x',
        //herplaatsen reset zoom button
        resetZoomButton: {
          position: {
            color: '#156A26',
            align: 'left', // by default
            verticalAlign: 'bottom', // by default
            x: 0,
            y: 25
          }
        }
      },
      title: {
        text: this.sensorTypeName + ' statistics'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag to zoom in' : 'Pinch to zoom in'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        title: {
          text: this.sensorTypeUnit
        },
        plotLines: [{}]
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        scatter: {
          tooltip: {
             pointFormat: '{point.y}' + this.sensorTypeUnit
          }
       },
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [
        {
          //type: 'line',
          //name: 'USD to EUR',
          data: [[0, 0]]
        },
      ]

    }
  }

  //switch in view voor time settings dagen nacht
  changetimeSettings(): void {
    this.showdayNightSettings = !this.showdayNightSettings;
  }


  changeDayNightTime(): void {
    this.gemiddeldeNacht = 0;
    this.nachtCount = 0;
    this.dagCount = 0;
    this.gemiddeldeDag = 0;
    this.ngOnInit();

  }

  changeGraphType(): void {
    this.gemiddeldeNacht = 0;
    this.nachtCount = 0;
    this.dagCount = 0;
    this.gemiddeldeDag = 0;
    this.ngOnInit();
  }

  changeAverage(): void {
    //console.log("selectedDaysAverage", this.selectedDaysAverage);
    this.gemiddeldeNacht = 0;
    this.nachtCount = 0;
    this.dagCount = 0;
    this.gemiddeldeDag = 0;
    this.ngOnInit();
  }


  //filtermogelijkheid? :o
  testTest(): void {
    this.testBool = !this.testBool;
    if (this.testBool) {
      this.updateChart([[0, 0]]);
    } else {
      this.updateChart([[50, 20]]);
    }
  }

  updateChart(data: [[number, number]]) {
    //console.log(data);
    this.options.series = [
      {
        data: data,
        type: this.selectedGraphType,
        name: 'Measures of ' + this.sensorTypeName + ' ( ' + this.sensorTypeUnit + ' )',
        marker: {
          enabled: true,
          fillColor: '#FFFFFF',
          lineWidth: 2,
          lineColor: null,
          radius: 2
        }
      },

      {
        color: 'blue',
        width: '0.5',
        name: "Combined average",
        dashStyle: 'shortdash',
        marker: {
          enabled: false
        }
      },

      {
        color: 'black',
        width: '0.5',
        name: "Nightly average",
        dashStyle: 'shortdash',
        marker: {
          enabled: false
        }
      },

      {
        color: 'green',
        width: '0.5',
        name: "Daytime average",
        dashStyle: 'shortdash',
        marker: {
          enabled: false
        }
      },

    ]



    Highcharts.chart('container2', this.options);
    // this.testBool = true;
  }


  showAverage(): void {
    // console.log("in show average");
    // console.log("this.gemiddelde", this.gemiddelde);
    // console.log("this.nachtgemiddelde", this.gemiddeldeNacht);
    // console.log("this.daggemiddelde", this.gemiddeldeDag);

    this.averageBool = !this.averageBool;
    let averages = [
      {
        color: 'blue',
        id: 'Avarage',
        value: this.gemiddelde,
        width: '1',
        dashStyle: 'shortdash',
      },
      {
        color: 'black',
        value: this.gemiddeldeNacht,
        width: '1',
        dashStyle: 'shortdash',
      },
      {
        color: 'green',
        value: this.gemiddeldeDag,
        width: '1',
        zIndex: 4, // To not get stuck below the regular plot lines or series ?? geen idee hoe of wat dit doet :)
        dashStyle: 'shortdash',
      },

    ];

    if (this.averageBool) {
      this.options.yAxis = [
        {
          plotLines: averages,
          title: {
            text: this.sensorTypeUnit
          }
        }

      ]
    }
    //averages verbergen (opletten met data die weg is in options!)
    else {
      this.options.yAxis = [{
        plotLines: null,
        title: {
          text: this.sensorTypeUnit
        }
      }];
    }
    Highcharts.chart('container2', this.options);
  }

  ngOnInit(): void {
    this._spinner.show();
    //console.log("sensorTimestampLatestRecorded", this.sensorTimestampLatestRecorded);
    this.currentUser = this._authenticateService.getCurrentUser();

    //boxuser op halen voor start en einddatum
    this.boxUsers = this._boxUserService.getBoxUsersByUserID(this.currentUser.userID);

    //doorgekregen boxid checken in boxusers voor de juiste datums en data inladen
    this.boxUsers.pipe(
      map(boxUsers => boxUsers
        .filter(
          (bu: BoxUser) => bu.boxID == this.boxID
        )
      )
    ).subscribe(
      b => {
        this.currentBoxUser = b[0];
        //console.log("currentboxuser:", this.currentBoxUser);

        // deze call haalt de echte boxgegevens binnen
        this.measurements = this._measurementService.getMeasurementsByBoxSensorDate(this.boxID, this.sensorID, this.currentBoxUser.startDate, this.currentBoxUser.endDate);

        //testing with running box
        //this.measurements = this._measurementService.getMeasurementsByBoxSensorDate(3, 12, this.currentBoxUser.startDate, null);
        this.measurements.pipe(map(result => {
          let response: [[number, number]] = [[0, 0]];
          response.pop();
          result.forEach(t => {
            response.push([Date.parse("" + t.timeStamp), Number(t.value)]);
            //nacht en dag gemiddelde
            var datum = new Date(t.timeStamp);

            //berekenen tijdverschil meting laatste x dagen
            var n = 0;
            var dateMnsFive = moment(this.sensorTimestampLatestRecorded).subtract(this.selectedDaysAverage, 'day');
            //console.log("date minus x days: ", dateMnsFive);

            // zoeken foute waardes voor delete db
            // if ( Number(t.value) == 85)
            // {
            //   console.log("measurement of value 117", t.measurementID);
            // }

            if (datum > (dateMnsFive.toDate())) {
              //console.log('meting in laatste n dagen, this.selectedDaysAverage ', this.selectedDaysAverage, "datum: ", datum);

              if (datum.getUTCHours() < this.dagUur || datum.getUTCHours() >= this.nachtUur) {
                //console.log("in nachturen");
                this.nachtCount += 1;
                this.gemiddeldeNacht += Number(t.value);
              }
              else {
                //console.log("in daguren");
                this.dagCount += 1;
                this.gemiddeldeDag += Number(t.value);
              }
            }
          })

          //eerst alle waardes optellen en dan pas delen door hun aantal metingen
          this.gemiddelde = this.gemiddeldeDag + this.gemiddeldeNacht
          this.gemiddeldeDag = this.gemiddeldeDag / this.dagCount;
          this.gemiddeldeNacht = this.gemiddeldeNacht / this.nachtCount;
          this.gemiddelde /= (this.dagCount + this.nachtCount);

          // console.log("gemiddelde ", this.gemiddelde);
          // console.log("daggemiddelde ", this.gemiddeldeDag);
          // console.log("nachtgemiddelde ", this.gemiddeldeNacht);
          return response;
        })).subscribe(r => {
          this.updateChart(r);
          //workaround for switching en niet wegspringen van de gemiddeldes en ze pas geven na laden
          this.averageBool = !this.averageBool;
          this.showAverage();
          this._spinner.hide();
        });

        // console.log('metingen : ', this.metingen);
        // console.log('MetingenArray : ', this.MetingenArray);

      });

    //this.calculateAverages();
  }

  calculateAverages(): void {
    //Calculate average previousDay
    this.calculateLastDayAverage();

  }

  calculateLastDayAverage(): void {
    var date = new Date(this.sensorTimestampLatestRecorded);
    //console.log("datum in calculateLastDayAverage", date);

  }


}
