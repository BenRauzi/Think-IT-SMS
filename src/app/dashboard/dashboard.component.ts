import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(2)
  }
  test(){
    console.log(1)
  }

  openNav(menu) {
    document.getElementById("mySidenav").style.width = "10%";
    document.getElementById("main").style.marginLeft = "10%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0%";
  }

}