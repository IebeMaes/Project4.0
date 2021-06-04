import { Component, OnInit } from '@angular/core';
import { MonitoringService } from '../../services/monitoring.service';
import { ActivatedRoute } from '@angular/router';;

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  //id van box binnenhalen
  boxID: any = this._activatedroute.snapshot.paramMap.get("boxID");

  //activatedroute voor parameterdoorgave
  constructor(private _activatedroute: ActivatedRoute, private _monitoringService: MonitoringService) {
  }

  ngOnInit(): void {
  }

}
