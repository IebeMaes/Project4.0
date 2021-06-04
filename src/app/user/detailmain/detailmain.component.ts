import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-detailmain',
  templateUrl: './detailmain.component.html',
  styleUrls: ['./detailmain.component.scss']
})
export class DetailmainComponent implements OnInit {

  //welke detailpagina tonen
  //standaard init op chart
  showing = "Terrascope";

  //id van sensor en box binnenhalen
  sensorID: any = this._activatedroute.snapshot.paramMap.get("sensorID");
  boxID: any = this._activatedroute.snapshot.paramMap.get("boxID");
  sensorTypeName: any = this._activatedroute.snapshot.paramMap.get("sensorTypeName");
  sensorTimestamp: any = this._activatedroute.snapshot.paramMap.get("sensorTimestamp");


  //activatedroute voor parameterdoorgave
  constructor(private _activatedroute: ActivatedRoute, private _dataService: DataService) {

  }

  //on click op table of chart verandert deze
  changeDetailView() {
    if (this.showing == 'Terrascope') {
      this.showing = "Chart";
    }
    else if (this.showing == 'Chart') {
      this.showing = "Terrascope";
    }
  }

  ngOnInit(): void {
   }

}
