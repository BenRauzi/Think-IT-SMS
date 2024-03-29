import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService, DebugService } from '../../services';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';
// import { BaseModel } from '../../models';
import { MatSnackBar } from '@angular/material';
import { TokenDto, UserDto } from '../../dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private http: HttpClient, private snackBar: MatSnackBar, private debug: DebugService) {
    this.form = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',Validators.required]
  });
  }

  getErrorMessage(control) {
    return this.form.controls[control].hasError('required') ? 'You must enter a value' : '';
  }

  ngOnInit() {
    this.checkToken();
    this.debug.ping();
  }

  checkToken(){
    const token = localStorage.getItem('pt-usertoken');
    if(token){
      this.auth.authenticateToken(token).subscribe((data: any) => {
        if(data.msg === 'Token Expired'){
          console.log('Stay on login page, need to login again'); // debug
          localStorage.removeItem('pt-usertoken');
          localStorage.removeItem('pt-username');
          this.snackBar.open('Your previous session has expired, please log in again!', 'Ok', {
            duration: 5000,
          });
        }
        else{
          this.router.navigate(['/dashboard']);
        }
      });
    }
    else{
      console.log("Token does not exist!");
    }
  }
  
  skipLoginAdmin(){
    this.auth.login("TestAdmin", "passingword").subscribe((data: TokenDto) => {
      localStorage.setItem('pt-usertoken', data.token);
      this.auth.user.role = data.user.role;
      this.auth.user.username = "Admin Account";
      localStorage.setItem('pt-username', "Admin Account");

      this.router.navigate(['/dashboard']);
    });
  }

  skipLoginTeacher(){
    this.auth.login("TestTeach", "passingword").subscribe((data: TokenDto) => {
      localStorage.setItem('pt-usertoken', data.token);
      this.auth.user.role = data.user.role;
      this.auth.user.username = "Teacher Account";
      localStorage.setItem('pt-username', "Teacher Account");
      this.router.navigate(['/dashboard']);
    });
  }

  skipLoginStudent(){
    this.auth.login("TestStu", "passingword").subscribe((data: TokenDto) => {
      localStorage.setItem('pt-usertoken', data.token);
      this.auth.user.role = data.user.role;
      this.auth.user.username = "Student Account";
      localStorage.setItem('pt-username', "Student Account");
      this.router.navigate(['/dashboard']);
    });
  }

  login(){
    const val = this.form.value;
    this.auth.login(val.username, val.password).subscribe((data: TokenDto) => {
      console.log(data);
      if (data.token) {
          localStorage.setItem('pt-usertoken', data.token);
          localStorage.setItem('pt-username', data.user.username);
          this.auth.user.role = data.user.role;
          this.auth.user.username = data.user.username;
          this.router.navigate(['/dashboard']);
      } else {
          this.snackBar.open('Username/Password was incorrect', 'Ok', {
            duration: 5000,
          });
      }
  }, (e: any) => {
      console.error(e);
  });;
    
  }
}
