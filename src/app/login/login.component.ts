import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
  });
  }

  ngOnInit() {
    // this.api.getTodo().subscribe(data => function(){
    //   console.log(data);
    // });
    // // this.api.getTodo().subscribe(data => console.log(data));
  }

  login(){
    const val = this.form.value;
    // this.http.post('http://localhost:4200/api/login', val, {}).subscribe(data => {
    //   console.log(data);
    // });
    this.http.get('http://localhost:3000/api/users').subscribe(data => {
      console.log(data);
    })
    /* PUBLIC KEY = MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHwAXPvl8Vqi5yK2JcZN02cqP7Yz
oPj3kkj4I3BCjr4AsW3pHihToHMn+dhScCYjNodQvxjZ0If6ANjTTR7opD6Nw2ym
kHaH8ZuLF09ufjowIGQFMYBpXYNwmjcuS9EUXEZBaRvAc0QyAzPVpV7ZuObE/Mnn
B7ZLQNuWVghG2xLFAgMBAAE= */

/* private key = MIICWwIBAAKBgHwAXPvl8Vqi5yK2JcZN02cqP7YzoPj3kkj4I3BCjr4AsW3pHihT
oHMn+dhScCYjNodQvxjZ0If6ANjTTR7opD6Nw2ymkHaH8ZuLF09ufjowIGQFMYBp
XYNwmjcuS9EUXEZBaRvAc0QyAzPVpV7ZuObE/MnnB7ZLQNuWVghG2xLFAgMBAAEC
gYABpG+W1oDP1oCBMTBm4/j80M5vN1fWdFD3rnGptvf1BEVVU1UW66SgYdMpTk41
8xlxyVv+lEPyyRjhxkqrMiGavcCgfLRogHqhJtgw+VvtBK7vyurBzVSDIDdfrwgc
85Et8ksGTpnz0Yu7P9o2sZicGWSeB+qXXYe35SzLiuyPgQJBAMNJINj9x4+SE6we
qaxyOC2/eDzXWf1d6mx7Snxni79hkXtEXaJuPYGY+9IZezCv24ptzHNIXggyeDgk
EyRsFgkCQQCijbDd0zZgcezkeUp2R3j7UEO3FYOYJTbiWfC0T6Fx2Aw6plXScNjT
8HkFeXFIgOArAsXZBSkJhR6uNnb8puXdAkA2sZ2MiI9Cy6PM2g2laZwIXA7d42al
yo7kcSdsbke6gyYOwxgCbSO2z1UAA/j3qtkvDQ9s3kDPxOrctmXSFp+ZAkAx+8++
5gt6bI2jU4iKBkA1RuELkxn71rWhtHZHe5TxJLXd8vfA1eJWiUMtY8JpwPctQpUD
vop32u8sMqMz3T4hAkEAlVFIjyWzZmMJSJNdsp1YapMLG+vOFQMEaT2vL0Y9V1dJ
SUz1qbL9+25BRm41iZpYMHjpWQq2YUbLeqnjoQLfaw== */

    // return true;h
  }

}
