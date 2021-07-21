import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Player } from '../../models';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Player[];
  csk: Player[];
  rr: Player[];
  srh: Player[];
  kkr: Player[];
  dc: Player[];
  mi: Player[];
  kxip: Player[];
  rcb: Player[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get_ipl_team(localStorage.getItem('referral_code'))
    .subscribe(
      response => {
        // console.log(response[13]);
        this.team = response;
        this.csk = response.filter((item) => {return item.team_code == 'CSK'});
        this.rr = response.filter((item) => {return item.team_code == 'RR'});
        this.srh = response.filter((item) => {return item.team_code == 'SRH'});
        this.kkr = response.filter((item) => {return item.team_code == 'KKR'});
        this.dc = response.filter((item) => {return item.team_code == 'DC'});
        this.mi = response.filter((item) => {return item.team_code == 'MI'});
        this.kxip = response.filter((item) => {return item.team_code == 'KXIP'});
        this.rcb = response.filter((item) => {return item.team_code == 'RCB'});
        // console.log(this.csk);
      },
      error => {console.log(error)
      }
    )
  }

}
