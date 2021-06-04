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
import { formatDate } from '@angular/common';

import { NgxSpinnerService } from "ngx-spinner";

import * as moment from 'moment';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';

declare var require: any;
declare const Buffer;
import { Utils } from 'tslint';
import { numberFormat } from 'highcharts';

let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');


Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-terrascope',
  templateUrl: './terrascope.component.html',
  styleUrls: ['./terrascope.component.scss']
})
export class TerrascopeComponent implements OnInit {

  //algemene opties chart
  public options: any;

  //font awesome used icons
  faArrowRight = faArrowRight;
  faWindowClose = faWindowClose;
  faEye = faEye;
  faChartLine = faChartLine;
  faChartPie = faChartPie;
  faScatter = faBraille;

  //ingelezen data
  //measurements: Observable<Measurement[]>;


  boxUsers: Observable<BoxUser[]>;
  currentUser: User;
  currentBoxUser: BoxUser;

  graphTypes: string[] = ['scatter', 'line', 'bar'];

  enddate: Date;
  startdate: Date;

  //(for) user selected variables
  selectedGraphType: string = "scatter";

  boxID: any = this._activatedroute.snapshot.paramMap.get("boxID");

  data: Promise<any>;
  newdata: any;
  values: any[] = [];

  latitude: any = 50;
  longitude: any = 5;
  polygon2: any;


  constructor(private _activatedroute: ActivatedRoute, private _dataService: DataService,
    private _authenticateService: AuthenticateService, private _boxUserService: BoxUserService,
    private _measurementService: MeasurementService, private _spinner: NgxSpinnerService) {
    //option setting for chart
    //bij overschrijven in app van deze velden niet vergeten deze op te nemen in update chart
    this.options = {
      //correctie tijdzone
      time: {
        timezoneOffset: - 1 * 60
      },
      //algemene settings van grafiek (hier kan je ook voor andere types definieren)
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
        text: 'Cropsar statistics'
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
          text: 'FAPAR'
        },
        plotLines: [{}]
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        scatter: {
          tooltip: {
            pointFormat: 'Time: {point.x:%e %B %Y,  %Hu} <br>' + 'Value: {point.y}',
            valueDecimals: 3
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

  //veranderen van grafiek, alles wordt via init terug ingeladen via updateCharts
  changeGraphType(): void {
    this.ngOnInit();
  }

  updateChart(data: any[]) {
    //console.log(data);
    this.options.series = [
      {
        data: data,
        type: this.selectedGraphType,
        name: 'Fraction of Absorbed Photosynthetically Active Radiation',
        marker: {
          enabled: true,
          fillColor: '#FFFFFF',
          lineWidth: 2,
          lineColor: null,
          radius: 2
        }
      }
    ]

    //render the chart met instellingen en data ingelezen, eindelijk :)
    Highcharts.chart('container2', this.options);
  }


  //van lat,long naar polygon
  //get lat en long van locatie
  //noord
  FromkmtoNposition = function (latitude, longitude, km) {
    var r_earth = 6378;
    var pi = Math.PI;
    var new_latitude = latitude + (km / r_earth) * (180 / pi);
    return [longitude, new_latitude];
  }

  //oost
  FromkmtoEposition = function (latitude, longitude, km) {
    var r_earth = 6378;
    var pi = Math.PI;
    var new_longitude = longitude + (km / r_earth) * (180 / pi) / Math.cos(latitude * pi / 180);
    return [new_longitude, latitude];
  }

  //zuid
  FromkmtoSposition = function (latitude, longitude, km) {
    var r_earth = 6378;
    var pi = Math.PI;
    var new_latitude = latitude - (km / r_earth) * (180 / pi);
    return [longitude, new_latitude];
  }

  //west
  FromKmToWPosition = function (latitude, longitude, km) {
    var r_earth = 6378;
    var pi = Math.PI;
    var new_longitude = longitude - (km / r_earth) * (180 / pi) / Math.cos(latitude * pi / 180);
    return [new_longitude, latitude];
  }

  ngOnInit(): void {
    this.enddate = new Date;
    //console.log("datum", formatDate(this.enddate, 'yyyy-MM-dd', 'NL' ));
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
        console.log("currentboxuser:", this.currentBoxUser);

        this.startdate = new Date(b[0].locations[0].startDate);
        this.latitude = b[0].locations[0].latitude;
        this.longitude = b[0].locations[0].longitude;

        //console.log("this.longitude this.latitude", this.longitude, this.latitude);

        this.polygon2 = {
          "type": "Polygon",
          "coordinates": [
            [
              //laatse param is de afstand naar de polygoncoordinaten: 1 is 1 km
              // 0.01 (10meter) werkte niet op onze data, 0.1 wel..
              // geen idee welke vereisten api stelt aan oppervlakte polygon, bbox, .. geocoordinaten
              this.FromkmtoNposition(this.latitude, this.longitude, 0.1),
              this.FromkmtoEposition(this.latitude, this.longitude, 0.1),
              this.FromkmtoSposition(this.latitude, this.longitude, 0.1),
              this.FromKmToWPosition(this.latitude, this.longitude, 0.1),
              this.FromkmtoNposition(this.latitude, this.longitude, 0.1)
            ]
          ]
        }

        //console.log(" this.polygon2",  this.polygon2);



        //console.log("startdate", (this.startdate));
        //console.log("formatDate(this.startdate, 'yyyy-MM-dd', 'NL')", (formatDate(this.startdate, 'yyyy-MM-dd', 'NL')));
        //console.log("currentboxuser:", this.currentBoxUser);


        //data cropsar ophalen met einddatum nu, begindatum start van gebruikdatum userbox
        const cropsarapi = "https://cropsar.vito.be/api/v1.0/cropsar/?feature=" + JSON.stringify(this.polygon2) + "&product=S2_FAPAR&start=" +
          formatDate(this.startdate, 'yyyy-MM-dd', 'NL') + "&end=" +
          formatDate(this.enddate, 'yyyy-MM-dd', 'NL') + "&source=probav-mep&crs=epsg%3A4326"


          //const cropsarapi = "https://cropsar.vito.be/api/v1.0/cropsar/?feature=%7B%22type%22:%20%22Polygon%22,%20%22coordinates%22:%20[[[5.0677549839019775,51.222878322026176],[5.0681304931640625,51.22252219296203],[5.06770133972168,51.222844725062366],[5.068902969360352,51.22027784452118],[5.0727760791778564,51.21957226327192],[5.072904825210571,51.221924158712596],[5.072894096374512,51.22328820301017],[5.070834159851074,51.222723775789596],[5.070383548736572,51.223691361073115],[5.0677549839019775,51.222878322026176]]]%7D&product=S2_FAPAR&start=2021-01-01&end=2021-02-01&source=probav-mep&crs=epsg%3A4326"
        //console.log(cropsarapi);
        async function getData(cropsarapi) {
          const response = await fetch(cropsarapi);
          var data = await response.json();
          //console.log('newdata', data);

          return data;
        }
        this.data = getData(cropsarapi);
        this.data.then((data) => {
          this.newdata = data;

          //console.log(this.newdata);

          for (let key in this.newdata) {
            this.values.push([Date.parse(key), this.newdata[key].data]);
          }
        }).then(() => {
          this.updateChart(this.values);
        }).then(()=>{
          this._spinner.hide();
        }).then(()=>{
          //eens testen of dat echt wel werkt da then gedoe
          //      ==> ok da werkt :-D zalig!!  (inspect in browser)
          //      tof :)
          //console.log("values (moet weergeven na spinner weg)", this.values);
        })

      })
  }


}
