import { Component, OnInit } from '@angular/core';
import { NoticesService } from 'src/services';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {

  constructor(private notices: NoticesService) { }

  ngOnInit() {
  }

  testWrite(){
    this.notices.write().subscribe((data) => {
      console.log(data);
    });
  }

  testRead(){
    this.notices.read().subscribe((data) => {
      console.log(data);
    });
  }

}
