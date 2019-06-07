import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  ngOnInit() {
    
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
  openSnackBar(message: string, action: string) {
    //
  }
  yearDialog():void{

  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  curclass: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, curclass: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, curclass: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, curclass: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, curclass: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, curclass: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, curclass: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, curclass: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, curclass: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, curclass: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, curclass: 'Ne'},
];