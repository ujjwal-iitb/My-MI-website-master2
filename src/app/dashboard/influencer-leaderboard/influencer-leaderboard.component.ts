import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-leaderboard',
  templateUrl: './influencer-leaderboard.component.html',
  styleUrls: ['./influencer-leaderboard.component.css']
})
export class InfluencerLeaderboardComponent implements OnInit {

  constructor(private router: Router,) {
    this.router.navigate(['/dashboard/']);
   }


  ngOnInit(): void {
  }

}
