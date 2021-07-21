import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.loading = false;
    // if ((localStorage.getItem('rid') != null) || (localStorage.getItem('referral_code') != null)){
    //   if (localStorage.getItem('rid') != null) {
    //     localStorage.setItem('referral_code', localStorage.getItem('rid'));
    //   } else {
    //     localStorage.setItem('rid', localStorage.getItem('referral_code'));
    //   }
    // }
  }
  title = 'my-mi';
  loading = true;
}
