import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RoutingTesterComponent } from './routing-tester/routing-tester.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path:'login', component:LoginComponent, data:{title:"Login"} },
  { path:'routing', component:RoutingTesterComponent, data:{title:"Routing"} },
  { path:'dashboard', component: DashboardComponent, data:{title:"Dashboard"}},
  { path:'register', component: RegisterComponent, data:{title:"TEMP REGISTER"}},
  { path:'', redirectTo:'login',pathMatch:"full" },
  { path:'**', component:LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
