import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/services';
import { Student, BaseModel } from 'src/models';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  studentDetails: Student;

  dataSource = new MatTableDataSource<Student>([]);
// tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['FirstName', 'ForeNames', 'LastName', 'DateOfBirth', 'NSN', 'HomePhone', 'PhysicalUnitNo', 'PhysicalNumber', 'PhysicalStreet', 'PhysicalRuralDelivery', 'PhysicalSuburb', 'PhysicalPostcode', 'PostalUnitNo', 'PostalNumber', 'PostalStreet', 'PostalRuralDelivery', 'PostalSuburb', 'PostalPostcode', 'CaregiverOneRelationship', 'CaregiverOneName', 'CaregiverOneAddress', 'CaregiverOneHomePhone', 'CaregiverOneMobilePhone', 'CaregiverOneOccupation', 'CaregiverOneWorkPhone', 'CaregiverOneEmail', 'CaregiverTwoRelationship', 'CaregiverTwoName', 'CaregiverTwoAddress', 'CaregiverTwoHomePhone', 'CaregiverTwoMobilePhone', 'CaregiverTwoOccupation', 'CaregiverTwoWorkPhone', 'CaregiverTwoEmail', 'EmergencyContactRelationship', 'EmergencyContactName', 'EmergencyContactAddress', 'EmergencyContactHomePhone', 'EmergencyContactMobilePhone', 'EmergencyContactOccupation', 'EmergencyContactWorkPhone'];
  // displayedColumns: string[] = ['FirstName', 'LastName'];
  constructor(private details: DetailsService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(){
    this.details.getStudentDetailsAsStudent().subscribe((result: Student | BaseModel) => {
      if ((result as Student).UUID){
        // this.studentDetails = result as Student;
        this.dataSource.data = [result as Student];
        // console.log(this.studentDetails);
        console.log(this.dataSource);
      } else {
        console.log((result as BaseModel).msg);
      }

      // if((result as Student) instanceof Student){ (this didn't work?)
      //   console.log("result is student!")
      // }
      // else{
      //   console.log("result isn't student!");
      // }
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
