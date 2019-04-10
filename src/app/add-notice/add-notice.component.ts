import { Component, OnInit } from '@angular/core';
import { invoke } from 'q';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticesService } from 'src/services';
import { MatSnackBar } from '@angular/material';
import { BaseModel } from 'src/models';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder, private notices: NoticesService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      title: ['',[Validators.required, Validators.maxLength(50)]],
      information: ['',[Validators.required, Validators.maxLength(500)]]
  });
  }

  ngOnInit() {
  }

  addNotice() {
    const val = this.form.value;
    if(val.title.length <= 50 && val.information.length <= 500){
      this.notices.write(val.title, val.information).subscribe((data: BaseModel) => {
        if (data['status'] === 401) {
          this.snackBar.open('Error when trying to make notice', 'Ok', {
            duration: 5000,
          });
        }
        else{
          this.snackBar.open('Notice created Successfully', 'Ok', {
            duration: 5000,
          });
        }
      });
    }
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

}
