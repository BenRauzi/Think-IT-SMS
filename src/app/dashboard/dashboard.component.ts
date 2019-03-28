import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ApiService } from '../../services';
import { UserModel } from 'src/models';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private api: ApiService) { }

  role: string;

  isTeacher = false;
  isAdmin = false;
  ngOnInit() {
    this.checkPermission();
  }

  async checkPermission() {
    if (!this.auth.user.role) {
      this.api.getUser().subscribe((data: UserModel) => {
        this.auth.user = data;
        this.role = this.auth.user.role;
        this.updatePermissions();
      });
    }
    this.role = this.auth.user.role;
    this.updatePermissions();
  }

  updatePermissions() {
    if (this.role === 'Teacher') {
      this.isTeacher = true;
    } else if (this.role === 'Administrator') {
      this.isTeacher = true;
      this.isAdmin = true;
    } else if (this.role === 'Student') {
      this.isTeacher = false;
      this.isAdmin = false;
    }
  }

  logout() {
    localStorage.removeItem('pt-usertoken');
    this.router.navigate(['/login']);
  }
}
