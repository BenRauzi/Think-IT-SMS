import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments';
import { BaseModel } from 'src/models';
import { MatSnackBar } from '@angular/material';

const API_URL = environment.API_URL;

export interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  roles: Role[] = [
    {value:'Student', viewValue:"Student"},
    {value:'Teacher', viewValue:'Teacher'},
    {value:'Administrator', viewValue:'Administrator'}
  ]

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      name: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      role: ['', Validators.required]
    });
  }


  getErrorMessage(control) {
    return this.form.controls[control].hasError('required') ? 'You must enter a value' : this.form.controls[control].hasError('minLength') ? 'Password must be 8 characters or longer' : '';
  }

  ngOnInit() {
  }

  register(){
    const val = this.form.value;
    const options = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })};
    this.http.post(`${API_URL}/api/register`, {username: val.username, name: val.name, password: val.password, role: val.role}, options).subscribe((data: BaseModel) => {
      console.log(data);
      if(data.msg === "Register Successful"){
        this.snackBar.open('Successfully Registered User!', 'Ok', {
          duration: 5000,
        });
        this.form.reset();
      }
      else{
        this.snackBar.open('Error when trying to register User', 'Ok', {
          duration: 5000,
        });
      }
    });
  }

  closeNav() {
    if ( document.getElementById("sideNav").style.width != "") {
      document.getElementById("sideNav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("ribbon").style.marginLeft = "0%";
    }
  }
}
