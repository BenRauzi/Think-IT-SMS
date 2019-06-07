import {Component, OnInit, ChangeDetectorRef, ViewChild, NgModule} from '@angular/core';
import {FormControl, FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import { Student } from 'src/models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DetailsService } from 'src/services';
import {MatSort} from '@angular/material/sort';

let STUDENT_DATA: Student[];
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  dataSource = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = ['Name', 'UserID'];

  visible = true;

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  myGroup: FormGroup;
  
  constructor(private students: DetailsService, private fb: FormBuilder) { 
    this.myGroup = this.fb.group({keywords: ['', Validators.required]})
  }
  ngOnInit() {
     this.dataSource.paginator = this.paginator;
    this.students.getStudents().subscribe((data: Student[]) => { //? api call to get notices
      console.log(data);
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
