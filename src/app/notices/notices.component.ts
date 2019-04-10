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

  dataSource = new MatTableDataSource<Notice>([{title:'Hello',information:'test',teacher:'yes'}]);
  displayedColumns: string[] = ['title', 'information', 'teacher'];

  visible = true;
  constructor(private notices: NoticesService) { }

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.notices.read().subscribe((data: Notice[]) => {
      this.dataSource.data = data;
      console.log(data);
    }); 
  }

}
