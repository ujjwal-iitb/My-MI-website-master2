import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Match, Player } from '../../models';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  // player1_err: string = 'none';
  // player2_err: string = 'none';
  // player3_err: string = 'none';
  // player1: Player;
  // player2: Player;
  // player3: Player;
  // id1: number;
  // id2: number;
  // id3: number;
  // state_list: Player[];
  // match_title: string;
  // match_time: string;
  // home_team_code: string;
  // away_team_code: string;
  // match_id: number;
  not_done: boolean = true;
  matches: Match[];
  team: Player[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get_match()
      .subscribe(
        data => {
          this.matches = data;
          console.log(this.matches);
          if (localStorage.getItem("ipl_team") == null){
            this.team = JSON.parse(localStorage.getItem('ipl_team'));
            this.updateUI();
          } else{
            this.api.get_ipl_team(localStorage.getItem('referral_code'))
              .subscribe(
                response => {
                  this.team = response;
                  this.updateUI();
                },
                error => {console.log(error)}
              )
          }
          // data.forEach((response) => {
          //   this.match_title = response[0]['match__home_team'] + " Vs " + response[0]['match__away_team'];
          //   this.match_time = response[0]['match__date']
          //   this.match_time = this.match_time.substring(0, this.match_time.length - 8) + " " + this.match_time.substring(this.match_time.length - 8);
          //   this.home_team_code = response[0].match__home_team_code;
          //   this.away_team_code = response[0].match__away_team_code;
          //   this.match_id = response[0]['pk'];
          //   this.id1 = response[0]['player1'];
          //   this.id2 = response[0]['player2'];
          //   this.id3 = response[0]['player3'];
          //   if (localStorage.getItem("ipl_team") == null){
          //     this.api.get_ipl_team(localStorage.getItem('referral_code'))
          //       .subscribe(
          //         response => {
          //           this.state_list = response.filter((item) => { return (item.team_code == this.home_team_code) || (item.team_code == this.away_team_code) });
          //           this.player1 = this.state_list.filter((item) => {return item.id == this.id1})[0]
          //           this.player2 = this.state_list.filter((item) => {return item.id == this.id2})[0]
          //           this.player3 = this.state_list.filter((item) => {return item.id == this.id3})[0]
          //         },
          //         error => {console.log(error);
          //         }
          //       )
          //   } else{
          //     this.state_list = JSON.parse(localStorage.getItem("ipl_team"))
          //   }
          // })
        },
        error => {console.log(error);
          this.not_done = false;
        }
      )
  }

  updateUI(){
    this.matches.forEach((match) => {
      match.sub_team = this.team.filter((item) => { return (item.team_code == match.match__home_team_code) || (item.team_code == match.match__away_team_code) });
      match.match_title = match.match__home_team + " Vs " + match.match__away_team;
      match.match_time = match['match__date']
      match.match_time = match.match_time.substring(0, match.match_time.length - 8) + " " + match.match_time.substring(match.match_time.length - 8);
      match.not_done = true;
      match.p1 = this.team.filter((item) => {return item.id == match['player1']})[0];
      match.p2 = this.team.filter((item) => {return item.id == match['player2']})[0];
      match.p3 = this.team.filter((item) => {return item.id == match['player3']})[0];
    });
    console.log(this.matches);
  }

  place_bid(match: Match){
    // console.log(this.player1, this.player2, this.player3, this.match_id);
    match.player2_err = '';
    match.player1_err = '';
    match.player3_err = '';
    if (match.p1 == undefined){
      match.player1_err = 'solid red';
      return
    }
    if (match.p2 == undefined){
      match.player2_err = 'solid red';
      return
    }
    // if (this.player3 == undefined){
    //   this.player3_err = 'solid red';
    //   return
    // }
    if (match.p1.name == match.p2.name){
      match.player2_err = 'solid red';
      return
    }
    if (match.p2.name == match.p3.name){
      match.player3_err = 'solid red'
      return
    }
    if (match.p1.name == match.p3.name){
      match.player3_err = 'solid red'
      return
    }
    if (match.p1.team_code == match.p2.team_code){
      if (match.p2.team_code == match.p3.team_code){
        // console.log("Not possible")
        match.player3_err = 'solid red'
        return
      }
    }
    // console.log("Possible");
    this.api.set_bid(match.p1.id, match.p2.id, match.p3.id, match['pk'])
    .subscribe(
      response => { match.not_done = false;},
      error => {console.log(error)}
    )
  }

}
