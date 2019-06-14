import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Student } from 'src/models';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DetailsService } from 'src/services';

let STUDENT_DATA: Student[];

export interface DialogData {

}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  Keywords = new FormControl();

  advancedSearch:boolean;

  options: string[] = ['One', 'Two', 'Three'];
  
  filteredOptions: Observable<string[]>;

  dataSource = new MatTableDataSource<Student>([]);

  displayedColumns: string[] = ['FirstName', 'LastName', "Sex", "YearGroup", "Homeroom", "DateOfBirth", "LevelOneCredits", "LevelTwoCredits", "LevelThreeCredits"];

  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  myGroup: FormGroup;

  myControl = new FormControl();

  constructor(private students: DetailsService, private fb: FormBuilder, public dialog: MatDialog) { 
    this.myGroup = this.fb.group({keywords: ['', Validators.required]})
  }

  age: [];
  openYearDialog() {
    this.dialog.open(yearDialog, {
      data: {name: this.age}
    });
  }
  class: [];
  openClassDialog() {
    this.dialog.open(classDialog, {
      data: {name: this.class}
    });
  }

  ngOnInit() {
     this.dataSource.paginator = this.paginator;
    this.students.getStudentInfo().subscribe((data: Student[]) => { //? api call to get students
      console.log(data);
      this.dataSource.data = data.reverse();
    }); 

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.dataSource.sort = this.sort;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
//This is all the dialogs====================================================================================
//YEAR DIALOG================================================================================================
@Component({
  selector: 'Dialogs/year',
  templateUrl: 'Dialogs/year.html',
  styleUrls: ['search.component.scss']
})
export class yearDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
//CLASS DIALOG===============================================================================================
@Component({
  selector: 'Dialogs/class',
  templateUrl: 'Dialogs/class.html',
  styleUrls: ['search.component.scss']
})
export class classDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}