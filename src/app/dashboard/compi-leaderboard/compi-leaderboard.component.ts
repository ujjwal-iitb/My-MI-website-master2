import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { activity } from '../leaderboard/table/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compi-leaderboard',
  templateUrl: './compi-leaderboard.component.html',
  styleUrls: ['./compi-leaderboard.component.css']
})
export class CompiLeaderboardComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) {
    this.router.navigate(['/dashboard/']);
   }

  profile_img = '';
  overall;
  speaking;
  music;
  magic;
  lit;
  journalism;
  fine;
  dram;
  dance;
  design;
  score: string;
  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;
  activity: activity;
  curr_level = "BRONZE";
  next_level = "SILVER";

  ngOnInit(): void {
    if (localStorage.getItem('level') == 'level 2'){
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
    this.apiService.getCompiLeaderboards()
    .subscribe(
      response => {
        this.overall = {
          data: response['overall'],
          heading: "MI CHAMPIONSHIP"
        };
        this.speaking = {
          data: response['speaking'],
          heading: "SPEAKING ARTS"
        };
        this.music = {
          data: response['music'],
          heading: "MUSIC"
        };
        this.magic = {
          data: response['magic'],
          heading: "MAGIC & LIFESTYLE"
        };
        this.lit = {
          data: response['lit'],
          heading: "LITERARY ARTS"
        };
        this.journalism = {
          data: response['journalism'],
          heading: "JOURNALISM & COMMUNICATION"
        };
        this.fine = {
          data: response['fine'],
          heading: "FINE ARTS"
        };
        this.dram = {
          data: response['dram'],
          heading: "DRAMATICS"
        };
        this.dance = {
          data: response['dance'],
          heading: "DANCE"
        };
        this.design = {
          data: response['design'],
          heading: "DESIGN & DIGITAL ARTS"
        };
      },
      error => { console.log(error); }
    )
    this.score = localStorage.getItem('score');
    this.profile_img = localStorage.getItem("pic_url");
    this.progress = localStorage.getItem('progress');
    for (let i = parseFloat(this.progress); i < 100;){
      this.progress_dot[Math.floor(i/10)] = 0.5;
      i += 10;
    }
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');
  }

}
