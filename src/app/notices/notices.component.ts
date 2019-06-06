import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NoticesService } from 'src/services';
import { Notice } from 'src/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';

let NOTICE_DATA: Notice[];
@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {

  dataSource = new MatTableDataSource<Notice>([]);
  displayedColumns: string[] = ['title', 'information', 'teacher'];

  visible = true;
  constructor(private notices: NoticesService) { }

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.notices.read().subscribe((data: Notice[]) => { //? api call to get notices
      this.dataSource.data = data.reverse();
    }); 
  }

  closeNav() {
    if ( document.getElementById("sideNav").style.width != "") {
      document.getElementById("sideNav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0%";
      try {
        document.getElementById("ribbon").style.marginLeft = "0%";
      } catch(err) {}
    }
  }

}
