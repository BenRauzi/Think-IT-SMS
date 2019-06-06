import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ApiService, DetailsService, DebugService } from '../../services';
import { ImageDto } from 'src/dto';
import { UserModel } from 'src/models';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  image: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

// tslint:disable-next-line: max-line-length
  constructor(private debug: DebugService, private router: Router, public auth: AuthService, private api: ApiService, private snackBar: MatSnackBar, public dialog: MatDialog, private details: DetailsService) { }

  role: string;

  isTeacher = false;
  isAdmin = false;

  newImage: string;

  ngOnInit() {
    this.checkPermission();
    this.getProfileImage();

    if(this.auth.user.username == null) {
      this.auth.user.username = localStorage.getItem('pt-username');
      document.getElementById("name").innerHTML = this.auth.user.username;
   
    }
  }
  
  changeAvatar() {
    const file = (document.getElementById('avatarInput') as HTMLInputElement).files[0];
    const Image = document.createElement('img');
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      Image.src = (reader.result as string);
      Image.onload = () => {
        const width = Image.naturalWidth;
        const height = Image.naturalHeight;
        if (width === height && width <= 600) {
          this.newImage = Image.src as string;
          this.openDialog(this.newImage);
        } else {
          this.snackBar.open('Image must be square and equal to or less than 600x600', 'Ok', {
            duration: 5000,
          });
        }
        console.log(Image.naturalWidth, Image.naturalHeight);
      }; 
      // preview.src = (reader.result as string);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  getProfileImage(){
    this.details.getProfileImage().subscribe((result: ImageDto) => {
      if(result.image != "null"){
        (document.getElementById('avatarImage') as HTMLImageElement).src = result.image;
      }
    });
  }

  openDialog(image): void {
    console.log(this.dialog);
// tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ConfirmBoxDialog, {
      width: '600px',
      height: '400px',
      data: {image}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === true) {
        (document.getElementById('avatarImage') as HTMLImageElement).src = this.newImage;
        this.debug.ping();
        this.details.updateProfileImage(this.newImage).subscribe((result2) => {
          console.log(result2);
        });
      }
    });
  }

  async checkPermission() {
    if (!this.auth.user.role) {
      // this.api.getUser().subscribe((data: UserModel) => {
      //   this.auth.user = data;
      //   this.role = this.auth.user.role;
      //   this.updatePermissions();
      // });
    }
    // this.role = this.auth.user.role;
    // this.updatePermissions();
  }

  updatePermissions() {
    if (this.role === 'Teacher') {
      this.isTeacher = true;
    } else if (this.role === 'Administrator') {
      this.isTeacher = true;
      this.isAdmin = true;
    } else if (this.role === 'Student') {
      this.isTeacher = false;
      this.isAdmin = false;
    }
  }

  logout() {
    localStorage.removeItem('pt-usertoken');
    localStorage.removeItem('pt-name');
    this.router.navigate(['/login']);
  }

  openNav(menu) {

    if (menu == "none") {
      this.closeNav();
      return;
    }
    const menuItems = ["teacher", "teacher_notices", "results","ncea_summary"];
    document.getElementById("sideNav").style.width = "192px";

    [].forEach.call(document.querySelectorAll('.other'), function (el) {
      el.style.display = 'none';
    });
    menuItems.forEach( function (item) {
      if (item != menu) {
        [].forEach.call(document.querySelectorAll("." + item), function (el) {
          el.style.display = 'none';
        });
      } else {
        [].forEach.call(document.querySelectorAll("." + item), function (el) {
          el.style.display = 'block';
        });
      }
    });

    document.getElementById("main").style.marginLeft = "192px";
    try {
     document.getElementById("ribbon").style.marginLeft = "192px";
    } catch(e){}
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

@Component({
  selector: 'confirm-box-dialog',
  templateUrl: 'confirm-box-dialog.html',
  styleUrls: ['./confirmBox.scss']
})
export class ConfirmBoxDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}