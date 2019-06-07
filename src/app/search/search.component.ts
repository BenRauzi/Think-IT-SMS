import {Component, OnInit, ChangeDetectorRef, ViewChild, NgModule} from '@angular/core';
import {FormControl, FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import { Notice } from 'src/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { NoticesService } from 'src/services';

let NOTICE_DATA: Notice[];
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  dataSource = new MatTableDataSource<Notice>([]);
  displayedColumns: string[] = ['title', 'information', 'teacher'];

  visible = true;

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  myGroup: FormGroup;
  
  constructor(private notices: NoticesService, private fb: FormBuilder) { 
    this.myGroup = this.fb.group({keywords: ['', Validators.required]})
  }

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
