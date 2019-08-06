import { Component, OnInit, Inject } from '@angular/core';
import { invoke } from 'q';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticesService, AuthService } from 'src/services';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';
import { BaseModel, Notice } from 'src/models';
import { Router } from '@angular/router';
import { DialogData } from '../navigation/navigation.component';

export interface AddNoticeDialogData {
  notice: Notice;
}

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {
  form: FormGroup;
  
// tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, public dialog: MatDialog, private fb: FormBuilder, private notices: NoticesService, private snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      title: ['',[Validators.required, Validators.maxLength(50)]],
      information: ['',[Validators.required, Validators.maxLength(500)]],
      enddate: ['']
  });
  }

  ngOnInit() {
    setTimeout(() => 
    {
      this.snackBar.open('Image will be replaced momentarily', 'Ok', {
        duration: 5000,
      })
    },
    500);
  }

  addNotice(val: {title: string, information: string, enddate: string}) {
    this.notices.write(val.title, val.information, val.enddate).subscribe((data: BaseModel) => {
      if (data['status'] === 401) {
        this.router.navigate(['/login']);
      } else {
        this.snackBar.open('Notice created Successfully', 'Ok', {
          duration: 5000,
        });
        this.form.reset();
      }
    });
  }

  getErrorMessage(control) {
  if (control === 'title') {
    // tslint:disable-next-line: max-line-length
    return this.form.controls[control].hasError('required') ? 'You must enter a value' : this.form.controls[control].hasError('maxlength') ? 'Max Length of Title is 50 Characters' : '';
  } else if (control === 'information') {
    // tslint:disable-next-line: max-line-length
    return this.form.controls[control].hasError('required') ? 'You must enter a value' : this.form.controls[control].hasError('maxlength') ? 'Max Length of Description is 300 Characters' : '';

  }
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

  openDialog(): void {
    const val = this.form.value;
    if(val.enddate == ''){
      val.enddate = new Date(new Date().setDate(new Date().getDate() + 7));
      // val.enddate = new Date(new Date().setSeconds(new Date().getSeconds() + 30)); //! for testing deleting notices (30 seconds until delete)
    }
    val.enddate = val.enddate.toJSON();
    if(val.title.length <= 50 && val.information.length <= 500){
      // tslint:disable-next-line: no-use-before-declare
      const dialogRef = this.dialog.open(AddNoticeConfirmBoxDialog, {
        width: '600px',
        height: '400px',
        data: {notice: [this.form.value.title, this.form.value.information, this.form.value.enddate, localStorage.getItem('pt-username')]}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result === true) {
          this.addNotice(val);
        }
      });
    } else {
      if(val.title.length > 50 && val.information.length > 500){
        this.snackBar.open('Title and Description are too long!', 'Ok', {
          duration: 5000
        });
      } else if(val.title.length > 50){
        this.snackBar.open('Title is too long!', 'Ok', {
          duration: 5000
        });
      } else {
        this.snackBar.open('Description is too long!', 'Ok', {
          duration: 5000
        });
      }
    }
  }

}

@Component({
  selector: 'add-notice-confirm',
  templateUrl: 'add-notice-confirm.html',
  styleUrls: ['./addNoticeConfirm.scss']
})
// tslint:disable-next-line: component-class-suffix
export class AddNoticeConfirmBoxDialog {

  dataSource = new MatTableDataSource<Notice>([]);
  displayedColumns: string[] = ['title', 'information', 'teacher'];
  time: string;

  constructor(
    public dialogRef: MatDialogRef<AddNoticeConfirmBoxDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddNoticeDialogData) {}

  ngOnInit(): void {
    this.dataSource.data = [this.data.notice];
    const date = new Date(this.data.notice[2]);
    this.time = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}