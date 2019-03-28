import { Component, OnInit } from '@angular/core';
import { invoke } from 'q';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticesService } from 'src/services';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder, private notices: NoticesService) {
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
      this.notices.write(val.title, val.information).subscribe((data) => {
        if (data['status'] === 401) {
          console.log('Not Authorized!');
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
