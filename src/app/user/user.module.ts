import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GoogleChartsModule } from 'angular-google-charts';

import {FilterContentPipe } from "../pipes/filter-content.pipe";

import { DetailmainComponent } from './detailmain/detailmain.component';
import { TabledetailComponent } from './tabledetail/tabledetail.component';
import { ChartComponent } from './chart/chart.component';

import { SafePipeModule } from 'safe-pipe';
import { MonitoringComponent } from './monitoring/monitoring.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgxSpinnerModule } from "ngx-spinner";
import { TerrascopeComponent } from './terrascope/terrascope.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DashboardComponent, ProfileComponent, FilterContentPipe, DetailmainComponent, TabledetailComponent, ChartComponent, MonitoringComponent, TerrascopeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
    ChartsModule,
    WavesModule,
    GoogleChartsModule,
    ReactiveFormsModule,
    SafePipeModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    RouterModule
    
  ]
})
export class UserModule { }
