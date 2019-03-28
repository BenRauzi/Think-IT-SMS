import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  role: string;

  isTeacher = false;
  isAdmin = false;
  ngOnInit() {
    this.role = this.auth.user.role;
    if(this.role === "Teacher"){ this.isTeacher = true }
    else if(this.role === "Administrator"){
      this.isTeacher = true;
      this.isAdmin = true;
    }
  }

  logout(){
    localStorage.removeItem('pt-usertoken');
    this.router.navigate(['/login']);
  }
}
