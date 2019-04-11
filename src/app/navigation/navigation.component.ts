import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ApiService } from '../../services';
import { UserModel } from 'src/models';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private api: ApiService) { }

  role: string;

  isTeacher = false;
  isAdmin = false;
  ngOnInit() {
    this.checkPermission();
  }

  async checkPermission() {
    if (!this.auth.user.role) {
      // this.api.getUser().subscribe((data: UserModel) => {
      //   this.auth.user = data;
      //   this.role = this.auth.user.role;
      //   this.updatePermissions();
      // });
    }
    // this.role = this.auth.user.role;
    // this.updatePermissions();
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

  openNav(menu) {

    if (menu == "none") {
      this.closeNav()
      return
    }
    const menuItems = ["teacher", "teacher_notices", "results","ncea_summary"]
    document.getElementById("sideNav").style.width = "192px";

    [].forEach.call(document.querySelectorAll('.other'), function (el) {
      el.style.display = 'none';
    });
    menuItems.forEach( function (item) {
      if (item != menu) {
        [].forEach.call(document.querySelectorAll("." + item), function (el) {
          el.style.display = 'none';
        });
      } else {
        [].forEach.call(document.querySelectorAll("." + item), function (el) {
          el.style.display = 'block';
        });
      }
    })

    document.getElementById("main").style.marginLeft = "192px";
    document.getElementById("ribbon").style.marginLeft = "192px";
  }

  closeNav() {
    if ( document.getElementById("sideNav").style.width != "") {
      document.getElementById("sideNav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("ribbon").style.marginLeft = "0%";
    }
  }
}
