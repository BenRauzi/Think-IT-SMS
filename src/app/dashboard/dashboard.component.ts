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

  ngOnInit() {
    this.role = this.auth.user.role;
  }

  logout(){
    localStorage.removeItem('pt-usertoken');
    this.router.navigate(['/login']);
  }
}
