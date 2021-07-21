import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Table, activity } from './table/table';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  profile_img = '';
  users_overall;
  users_city: Table;
  college_overall: Table;
  college_state: Table;
  city_overall: Table;
  score: string;
  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;
  activity: activity;
  curr_level = "BRONZE";
  next_level = "SILVER";

  coins: string;

  ngOnInit(): void {
    if (localStorage.getItem('level') == 'level 2'){
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
    if (this.apiService.users_overall == null){
      this.apiService.getLeaderboards(localStorage.getItem('referral_code'))
      .subscribe(
        response => {
          // console.log(response);
          this.users_overall = response['users_overall'];
          this.users_overall.heading = "Overall Leaderboard";
          this.users_overall.subheading = "From all around India";
          // console.log(this.users_overall)
          this.users_city = response['users_city'];
          this.users_city.heading = "City Leaderboard";
          this.users_city.subheading = "From your city";
  
          this.college_overall = response['college_overall'];
          this.college_overall.heading = "College Leaderboard";
          this.college_overall.subheading = "From all around India";
  
          this.college_state = response['college_state'];
          this.college_state.heading = "College State Leaderboard";
          this.college_state.subheading = "From your state";
  
          this.city_overall = response['city_overall'];
          this.city_overall.heading = "City Ranking";
          this.city_overall.subheading = "From all around India";
          this.apiService.set_leaderboards(response);
          // console.log(this.users_overall)
          // this.set_ranks();
        },
        error => { console.log(error); }
      )
      this.apiService.get_activity(localStorage.getItem('referral_code'))
      .subscribe(
        response => {this.activity = response; this.apiService.activity = response;},
        error => {console.log(error)}
      )
    }
    else{
      this.users_overall = this.apiService.users_overall;
      this.users_city = this.apiService.users_city;
      this.college_overall = this.apiService.college_overall;
      this.college_state = this.apiService.college_state;
      this.city_overall = this.apiService.city_overall;
      this.activity = this.apiService.activity;
    }
    this.score = localStorage.getItem('score');
    this.profile_img = localStorage.getItem("pic_url");
    this.progress = localStorage.getItem('progress');
    for (let i = parseFloat(this.progress); i < 100;){
      this.progress_dot[Math.floor(i/10)] = 0.5;
      i += 10;
    }
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');



    this.coins = (Number(this.score)/2).toString();
  }

  toggle_navbar(){
    // console.log('toggle nav bar');
  }
}
