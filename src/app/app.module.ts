// tslint:disable: max-line-length
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatOptionModule, MatSnackBarModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard, RoleGuard } from '../guards';
import { AuthService, ApiService, NoticesService, DetailsService, DebugService } from '../services';
import { JwtInterceptor } from '../services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AdminOnlyTestComponent } from './admin-only-test/admin-only-test.component';
import { NoticesComponent } from './notices/notices.component';
import { AddNoticeComponent } from './add-notice/add-notice.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailsEditTestComponent } from './student-details-edit-test/student-details-edit-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AdminOnlyTestComponent,
    NoticesComponent,
    AddNoticeComponent,
    StudentDetailsComponent,
    StudentDetailsEditTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    ApiService,
    NoticesService,
    DetailsService,
    DebugService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
