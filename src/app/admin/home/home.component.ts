import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCog, faTemperatureHigh, faBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goUsers() {
    this.router.navigate(['/admin/users']);
  }

  goSensors() {
    this.router.navigate(['/admin/sensors']);
  }

  goBoxes() {
    this.router.navigate(['/admin/boxes']);
  }

  faUserCog = faUserCog;
  faTemperatureHigh=faTemperatureHigh;
  faBox=faBox;
}
