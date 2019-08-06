import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ApiService, NoticesService } from '../../services';
import { UserModel, Notice, NceaCreditsModel } from 'src/models';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import Chart from 'chart.js';
import { NceaService } from 'src/services/nceaService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

// tslint:disable: no-shadowed-variable
export class DashboardComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService, private api: ApiService, private notices: NoticesService, private ncea: NceaService) { }

  dataSource = new MatTableDataSource<Notice>([]);
  displayedColumns: string[] = ['title', 'information', 'teacher'];

  visible = true;

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  role: string;
  username: string;


  isTeacher = false;
  isAdmin = false;

  likeCountOne = 1;
  likeCountTwo = 0;
  ngOnInit() {
    this.checkPermission();
    if (this.auth.user.username == 'undefined') {
        this.auth.user.username = localStorage.getItem('pt-username');
    }

    this.dataSource.paginator = this.paginator;
    this.notices.read().subscribe((data: Notice[]) => { // ? api call to get notices
      console.log(data);
      this.dataSource.data = data.reverse();
    });
    if (this.auth.user.role === 'Student') {
      this.generatePieChart();
    } else {
      document.getElementById('piechart-card').style.display = 'none';
    }
  }

  addLikeOne() {
    this.likeCountOne += 1;
  }

  addLikeTwo(){
    this.likeCountTwo += 1;
  }

  async generatePieChart() {
    await this.ncea.getTotalCredits().subscribe((result: NceaCreditsModel) => {
      if (result.notachieved + result.merit + result.achieved + result.excellence !== 0) {
        const ctx = document.getElementById('piechart-example');
        const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Acheived with Excellence', 'Achieved with Merit', 'Achieved', 'Not Achieved'],
            datasets: [{
                label: '# of Votes',
                data: [result.excellence, result.merit, result.achieved, result.notachieved],
                backgroundColor: [
                  'rgba(255, 204, 51, 0.7)',
                  'rgba(2, 117, 216, 0.7)',
                  'rgba(0, 128, 0, 0.7)',
                  'rgba(217, 83, 79, 0.7)'
                ],
                borderColor: [
                    '#FFCC33',
                    '#0275D8',
                    '#008000',
                    '#D9534F'
                ],
                borderWidth: 1
              }]
          },
          options: {
              legend: {
                  position: 'bottom'
              }
          }
        });
      }
    });
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
    localStorage.removeItem('pt-username');
    this.router.navigate(['/login']);
  }

  closeNav() {
    if ( document.getElementById('sideNav').style.width != '') {
      document.getElementById('sideNav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0%';
      try {
        document.getElementById('ribbon').style.marginLeft = '0%';
      } catch (err) {}
    }
  }
}
