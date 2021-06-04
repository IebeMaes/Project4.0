import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailmainComponent } from './user/detailmain/detailmain.component';
import { AuthGuard } from '../app/security/auth.guard';
import { HomeComponent } from './admin/home/home.component';
import { BoxesComponent } from './admin/boxes/boxes.component';
import { UsersComponent } from './admin/users/users.component';
import { SensorsComponent } from './admin/sensors/sensors.component';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { SensorFormComponent } from './admin/sensors/sensor-form/sensor-form.component';
import { MonitoringComponent } from './user/monitoring/monitoring.component';
import { BoxFormComponent } from './admin/boxes/box-form/box-form.component';
import { BoxEditFormComponent } from './admin/boxes/box-edit-form/box-edit-form.component';
import { TerrascopeComponent } from './user/terrascope/terrascope.component';
const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //authenticated users
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ["Boer"] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ["Boer"] } },
  { path: 'detailmain', component: DetailmainComponent, canActivate: [AuthGuard], data: { roles: ["Boer"] } },
  { path: 'monitoring', component: MonitoringComponent, canActivate: [AuthGuard], data: { roles: ["Boer"] } },
  { path: 'terrascope', component: TerrascopeComponent, canActivate: [AuthGuard], data: { roles: ["Boer"] } },


  //Routes for admin
  { path: 'admin/home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/users/userform', component: UserFormComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/boxes', component: BoxesComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/boxes/boxform', component: BoxFormComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/boxes/boxeditform', component: BoxEditFormComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/sensors', component: SensorsComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: 'admin/sensors/sensorform', component: SensorFormComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },



  //Everyone who is not authenticated
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
