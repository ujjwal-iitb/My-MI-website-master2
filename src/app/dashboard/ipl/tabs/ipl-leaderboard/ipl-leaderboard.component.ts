import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Participant } from '../../models';

@Component({
  selector: 'app-ipl-leaderboard',
  templateUrl: './ipl-leaderboard.component.html',
  styleUrls: ['./ipl-leaderboard.component.css']
})
export class IplLeaderboardComponent implements OnInit {

  constructor(private api: ApiService) { }

  show_ipl = false;
  participants: Participant[];

  ngOnInit(): void {
    this.api.get_ipl_leaderboard()
      .subscribe(
        response => { 
          // console.log(response);
          this.participants = response;
        },
        error => {console.log(error)
        }
      )
  }

}
