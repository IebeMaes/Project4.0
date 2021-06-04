import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersComponent } from './users/users.component';
import { BoxesComponent } from './boxes/boxes.component';
import { SensorsComponent } from './sensors/sensors.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserFormComponent } from './users/user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SensorFormComponent } from './sensors/sensor-form/sensor-form.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BoxFormComponent } from './boxes/box-form/box-form.component';
import { BoxEditFormComponent } from './boxes/box-edit-form/box-edit-form.component';
@NgModule({
  declarations: [HomeComponent, UsersComponent, BoxesComponent, SensorsComponent, UserFormComponent, SensorFormComponent, BoxFormComponent, BoxEditFormComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    AccordionModule,
    Ng2SearchPipeModule,
    NgbModule,
    NgxSpinnerModule

  ],
  providers: [BoxesComponent],
})
export class AdminModule { }
