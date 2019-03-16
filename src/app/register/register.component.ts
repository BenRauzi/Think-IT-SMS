import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      name: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
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
    this.http.post('http://localhost:3000/api/register', {username: val.username, name: val.name, password: val.password, role: val.role}, options).subscribe(data => {
      console.log(data);
    });
  }

}
