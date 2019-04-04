import { Component, OnInit } from '@angular/core';
import { Student, UserModel } from 'src/models';
import { DetailsService } from 'src/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  StudentDetails: FormGroup;

  oldStudentDetails = new Student();
  studentDetails = new Student();

  constructor(private details: DetailsService, private fb: FormBuilder) {
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
      console.log(this.students);
    });
  }

  changeStudent(event){
    this.details.getStudentDetails(event.value).subscribe((result: Student) => {
      this.studentDetails = result;
      this.oldStudentDetails = result;
    });
  }

  updateDetails(){
    this.details.setStudentDetails(this.studentDetails).subscribe(result => {
      console.log(result);
    });
  }

  cancelUpdate(){
    this.studentDetails = this.oldStudentDetails;
    console.log(this.studentDetails);
    console.log(this.oldStudentDetails);
  }

}