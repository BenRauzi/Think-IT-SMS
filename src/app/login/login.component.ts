import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',Validators.required]
  });
  }

  getErrorMessage(control) {
    return this.form.controls[control].hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/users').subscribe(data => {
      console.log(data);
    });
  }

  login(){
    const val = this.form.value;
    this.auth.login(val.username, val.password);
  }
}
