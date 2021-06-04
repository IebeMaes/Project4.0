import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LoginModule } from './login/login.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from "./user/user.module";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { GoogleChartsModule } from 'angular-google-charts';
import { SecurityInterceptor } from './security/security.interceptor';
import { SecurityModule } from './security/security.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipeModule} from 'safe-pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartModule } from 'angular2-highcharts';
//import * as highcharts from 'Highcharts';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminModule } from './admin/admin.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    MDBBootstrapModule,
    GoogleChartsModule,
    SecurityModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SafePipeModule,
    //ChartModule.forRoot(highcharts)
    FontAwesomeModule,
    AdminModule,
    AccordionModule.forRoot(),
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
