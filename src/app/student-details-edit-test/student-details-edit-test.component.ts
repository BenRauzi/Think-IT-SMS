import { Component, OnInit } from '@angular/core';
import { Student, UserModel } from 'src/models';
import { DetailsService } from 'src/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

export interface StudentNameID{
  Name: string;
  UserID: string;
}
@Component({
  selector: 'app-student-details-edit-test',
  templateUrl: './student-details-edit-test.component.html',
  styleUrls: ['./student-details-edit-test.component.scss']
})
export class StudentDetailsEditTestComponent implements OnInit {

  student: FormGroup;

  loading = false;

  StudentDetails: FormGroup;

  oldStudentDetails = new Student();
  studentDetails = new Student();

  constructor(private details: DetailsService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.student = this.fb.group({
      studentsSelect: ['', Validators.required]
    });
    this.StudentDetails = this.fb.group({
      FirstName: ['',],
      ForeNames: ['',],
      LastName: ['',],
      DateOfBirth: ['',],
      NSN: ['',],
      HomePhone: ['',],
      PhysicalUnitNo: ['',],
      PhysicalNumber: ['',],
      PhysicalStreet: ['',],
      PhysicalRuralDelivery: ['',],
      PhysicalSuburb: ['',],
      PhysicalPostcode: ['',],
      PostalUnitNo: ['',],
      PostalNumber: ['',],
      PostalStreet: ['',],
      PostalRuralDelivery: ['',],
      PostalSuburb: ['',],
      PostalPostcode: ['',],
      CaregiverOneRelationship: ['',],
      CaregiverOneName: ['',],
      CaregiverOneAddress: ['',],
      CaregiverOneHomePhone: ['',],
      CaregiverOneMobilePhone: ['',],
      CaregiverOneOccupation: ['',],
      CaregiverOneWorkPhone: ['',],
      CaregiverOneEmail: ['',],
      CaregiverTwoRelationship: ['',],
      CaregiverTwoName: ['',],
      CaregiverTwoAddress: ['',],
      CaregiverTwoHomePhone: ['',],
      CaregiverTwoMobilePhone: ['',],
      CaregiverTwoOccupation: ['',],
      CaregiverTwoWorkPhone: ['',],
      CaregiverTwoEmail: ['',],
      EmergencyContactRelationship: ['',],
      EmergencyContactName: ['',],
      EmergencyContactAddress: ['',],
      EmergencyContactHomePhone: ['',],
      EmergencyContactMobilePhone: ['',],
      EmergencyContactOccupation: ['',],
      EmergencyContactWorkPhone: ['',]
    });
  }

  students: StudentNameID[] = [];

  ngOnInit() {
    this.getStudents();
  }

  getStudents(){
    this.details.getStudents().subscribe((result: StudentNameID[]) => {
      this.students = result;
    });
  }

  changeStudent(event){
    this.loading = true;
    this.details.getStudentDetails(event.value).subscribe((result: Student) => {
      this.loading = false;
      this.studentDetails = result;
      this.oldStudentDetails = Object.assign({}, result);
    });
  }

  updateDetails(){
    this.oldStudentDetails = Object.assign({}, this.studentDetails);
    this.loading = true;
    this.details.setStudentDetails(this.studentDetails).subscribe(result => {
      this.loading = false;
      if(result["status"] === 401){
        this.router.navigate(['/login']);
      } else {
        this.snackBar.open('Successfully Updated Student!', 'Ok', {
          duration: 5000,
        });
      }
    });
  }

  cancelUpdate(){
    this.studentDetails = Object.assign({}, this.oldStudentDetails);
  }

}