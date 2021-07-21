import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  profile_img = '';
  fb_id = '';
  insta_id = '';
  linkedin_id = '';
  twitter_id = '';
  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;
  college: string;
  city: string;
  state: string;
  contact_number: string;
  email: string;
  curr_level = "BRONZE";
  next_level = "SILVER";

  ngOnInit(): void {
    if (localStorage.getItem('level') == 'level 2'){
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
    this.profile_img = localStorage.getItem('pic_url');
    this.progress = localStorage.getItem('progress');
    this.college = localStorage.getItem('college');
    this.city = localStorage.getItem('city');
    this.state = localStorage.getItem('state');
    this.contact_number = localStorage.getItem('contact_number');
    this.email = localStorage.getItem('email');
    // console.log(this.progress)
    for (let i = parseFloat(this.progress); i < 100;){
      this.progress_dot[Math.floor(i/10)] = 0.5;
      i += 10;
    }
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');
    if (localStorage.getItem('fb_id') !== 'null'){
      this.fb_id = localStorage.getItem('fb_id');
    }
    if (localStorage.getItem('insta_id') !== 'null'){
      this.insta_id = localStorage.getItem('insta_id');
    }
    if (localStorage.getItem('twitter_id') !== 'null'){
      this.twitter_id = localStorage.getItem('twitter_id');
    }
    if (localStorage.getItem('linkedin_id') !== 'null'){
      this.linkedin_id = localStorage.getItem('linkedin_id');
    }
  }

  validate(profile: string){
    if (profile == 'fb'){
    }
  }

  post(){
    localStorage.setItem('fb_id', this.fb_id);
    localStorage.setItem('insta_id', this.insta_id);
    localStorage.setItem('twitter_id', this.twitter_id);
    localStorage.setItem('linkedin_id', this.linkedin_id);
    this.apiService.update_social({
      rid: localStorage.getItem('referral_code'),
      fb_id: this.fb_id,
      insta_id: this.insta_id,
      twitter_id: this.twitter_id,
      linkedin_id: this.linkedin_id
    })
    .subscribe(
      response => { alert("updated successfully!")},
      error => {console.log(error)}
    )
  }

  toggle_navbar(){
    // console.log('toggle nav bar');
  }

}
