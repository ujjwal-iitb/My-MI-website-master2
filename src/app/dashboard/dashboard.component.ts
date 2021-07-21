import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationEnd } from '@angular/router';

declare let fbq:Function;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clicked: boolean;

  constructor(private apiService: ApiService, private router: Router) {
    router.events.subscribe((y: NavigationEnd) => {
      if(y instanceof NavigationEnd){
        // fbq('track', 'CompleteRegistration');
      }
     });
  }

  ngOnInit(): void {
    if (localStorage.getItem('referral_code') == null){
      this.router.navigate(['/']);
    }
    // if (localStorage.getItem('college') == null){
      this.apiService.get_details(localStorage.getItem('referral_code'))
      .subscribe(
        response => {
          // console.log(response);
          localStorage.setItem('name', response['name']);
          localStorage.setItem('email', response['email']);
          localStorage.setItem('level', response['ccp_level']);
          localStorage.setItem('college', response['college__name']);
          localStorage.setItem('city', response['college__city__name']);
          localStorage.setItem('state', response['college__city__state']);
          localStorage.setItem('score', response['score']);
          localStorage.setItem('fb_id', response['fb_id']);
          localStorage.setItem('insta_id', response['insta_id']);
          localStorage.setItem('twitter_id', response['twitter_id']);
          localStorage.setItem('linkedin_id', response['linkedin_id']);
          localStorage.setItem('mi_number', response['mi_number']);
          localStorage.setItem('progress', response['progress']);
          localStorage.setItem('contact_number', response['mobile_number']);
        },
        error => { console.log(error) }
      );
    // } else{
      // this.apiService.get_updates(localStorage.getItem('referral_code'))
      // .subscribe(
      //   response => {
      //     // console.log(response);
      //     localStorage.setItem('score', response['score']);
      //     localStorage.setItem('progress', response['progress']);
      //   },
      //   error => { console.log(error) }
      // );
    // }
    this.clicked = false;
  }

  toggle_navbar(){
    // console.log('at dashboard.ts')
    this.clicked = !this.clicked;
  }

}
