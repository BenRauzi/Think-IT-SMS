import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
  });
  }

  getErrorMessage(control) {
    return this.form.controls[control].hasError('required') ? 'You must enter a password' :
        this.form.controls[control].hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {

  }

  login(){
    const val = this.form.value;
    this.auth.login(val.email, val.password);
  }
}
