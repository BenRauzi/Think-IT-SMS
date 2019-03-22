import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { NoticesComponent} from './notices/notices.component';
import { RegisterComponent } from './register/register.component';
import { AdminOnlyTestComponent } from './admin-only-test/admin-only-test.component';
import { AuthGuard, RoleGuard } from '../guards';


const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path:'register', component: RegisterComponent },
  { path:'notices', component: NoticesComponent },
  { path: 'adminonly', component: AdminOnlyTestComponent, data: { role: "Administrator" }, canActivate: [ RoleGuard, AuthGuard ] },
  { path:'', redirectTo:'login', pathMatch:"full" },
  { path:'**', component:LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
