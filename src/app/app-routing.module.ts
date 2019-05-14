import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { NoticesComponent} from './notices/notices.component';
import { RegisterComponent } from './register/register.component';
import { AdminOnlyTestComponent } from './admin-only-test/admin-only-test.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard, RoleGuard } from '../guards';
import { AddNoticeComponent } from './add-notice/add-notice.component';
import { SearchComponent } from './search/search.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailsEditTestComponent } from './student-details-edit-test/student-details-edit-test.component';
// tslint:disable: max-line-length
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'navigation', component: NavigationComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: RegisterComponent, data: { role: 'Administrator'}, canActivate: [RoleGuard, AuthGuard]},
  { path: 'notices', component: NoticesComponent, canActivate: [ AuthGuard ] },
  { path: 'adminonly', component: AdminOnlyTestComponent, data: { role: 'Administrator' }, canActivate: [ RoleGuard, AuthGuard ] },
  { path: 'addnotice', component: AddNoticeComponent, data: {  role: 'Teacher'}, canActivate: [ RoleGuard, AuthGuard ] },
  { path: 'studentdetails', component: StudentDetailsComponent, canActivate: [ AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [ AuthGuard] },
  { path: 'editstudentdetails', component: StudentDetailsEditTestComponent, data: { role: 'Administrator'}, canActivate: [RoleGuard, AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
