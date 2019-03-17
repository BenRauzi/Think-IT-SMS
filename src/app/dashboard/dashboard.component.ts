import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatMenuItem } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNav(menu) {
    const menuItems = ["teacher", "asd","Oof"]
    document.getElementById("sideNav").style.width = "10%";
    document.getElementById("main").style.marginLeft = "10%";
    document.getElementById("ribbon").style.marginLeft = "10%";


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
  }

  closeNav() {
    if ( document.getElementById("sideNav").style.width != "") {
      document.getElementById("sideNav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0%";
      document.getElementById("ribbon").style.marginLeft = "0%";

    }
  }

}