// tslint:disable: max-line-length
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatOptionModule, MatSnackBarModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MatDialogModule, MatSliderModule, MatAutocompleteModule, MatRadioModule, MatMenuModule, MatButtonToggleModule, MatSortModule, MatChipsModule, MatIconModule, MatSlideToggleModule, MatGridListModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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
import { AddNoticeComponent, AddNoticeConfirmBoxDialog } from './add-notice/add-notice.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailsEditTestComponent } from './student-details-edit-test/student-details-edit-test.component';
import { NavigationComponent, ConfirmBoxDialog } from './navigation/navigation.component';
import { SearchComponent, yearDialog, classDialog, subjectDialog } from './search/search.component';
import {FormControl} from '@angular/forms';
import { NceaService } from 'src/services/nceaService';

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
    StudentDetailsEditTestComponent,
    NavigationComponent,
    ConfirmBoxDialog,
    SearchComponent,
    AddNoticeConfirmBoxDialog,
    yearDialog, 
    classDialog,
    subjectDialog

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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MatDialogRef, useValue: {}},
    AuthService,
    ApiService,
    NoticesService,
    DetailsService,
    DebugService,
    NceaService,
    AuthGuard,
    RoleGuard,
    MatNativeDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }

  ],
  entryComponents: [ConfirmBoxDialog, AddNoticeConfirmBoxDialog, yearDialog, classDialog, subjectDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
