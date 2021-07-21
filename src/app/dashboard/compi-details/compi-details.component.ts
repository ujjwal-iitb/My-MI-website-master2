import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Compi } from '../dash-competitions/dash-competitions.component';
import { Router } from '@angular/router';

export interface TeamMember {
  id: number,
  user_name: string,
  is_leader: boolean,
  team_id: number,
}

@Component({
  selector: 'app-compi-details',
  templateUrl: './compi-details.component.html',
  styleUrls: ['./compi-details.component.css']
})
export class CompiDetailsComponent implements OnInit {

  selected_compi: Compi;
  team: TeamMember[] = [];
  self_member: TeamMember;
  new_member: string = '';
  mi_regex = new RegExp("^[M|m][I|i]-[a-zA-z]{3}-[0-9]{3}$");

  constructor(private router: Router, private api: ApiService) { 
    this.router.navigate(['/dashboard/']);
  }

  ngOnInit(): void {
    console.log()
    this.api.get_compi_details(window.location.href.split('/')[window.location.href.split('/').length - 1])
      .subscribe(
        (response) => {
          console.log(response);
          this.selected_compi = response;
          if (this.selected_compi.is_group && this.selected_compi.registered) {
            this.get_team();
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getname() {
    return localStorage.getItem('name')
  }

  add() {
    // console.log(this.mi_regex.test(this.new_member));
    // if (this.mi_regex.test(this.new_member)) {
    //   this.api.add_member(this.self_member.id, this.new_member, this.self_member.team_id, this.selected_compi.id)
    //     .subscribe(
    //       response => { console.log(response); this.get_team(); alert(response['status']); this.new_member = ''; },
    //       error => { console.log(error); alert("There was some error, make sure you have entered the correct MI Number and that the player is not registered in other team"); }
    //     )
    // } else {
    //   alert("Please enter a valid MI-number (of the form MI-XXX-000)")
    // }
    alert("Not allowed, please contact us for any request.");

  }

  get_team() {
    this.api.get_team(this.selected_compi.id)
      .subscribe(
        response => {
          console.log(response);
          this.team = response;
          // this.team_id = response["team_id"];
          this.self_member = this.team.filter(item => { return item.user_name === localStorage.getItem('name') })[0];
        },
        error => {
          console.log(error)
        }
      )
  }

  remove(t: TeamMember) {
    // if (!this.self_member.is_leader) {
    //   alert("You need to be a team leader to remove members");
    //   return;
    // }
    // if (confirm("Are you sure you want to remove participant from the team?")){
    //   this.api.remove_member(t.id, t.team_id, 'remove')
    //     .subscribe(
    //       response => { console.log(response); this.get_team(); },
    //       error => { console.log(error) }
    //     )
    // }
    alert("Not allowed, please contact us for any request.");
  }

  leave() {
    // if (this.self_member.is_leader) {
    //   if (this.team.length > 1) {
    //     alert("You cannot leave the team as a leader, change the team leader then change");
    //     return;
    //   }
    // }
    // if (confirm("Are you sure you want to leave the team?")){
    //   this.api.remove_member(this.team.filter(item => { return item.user_name === localStorage.getItem('name') })[0].id, this.self_member.team_id, 'leave')
    //     .subscribe(
    //       response => { console.log(response); this.selected_compi.registered = false; },
    //       error => { console.log(error) }
    //     )
    // }
    alert("Not allowed, please contact us for any request.");
  }

  change(member_id: number){
    // if (this.self_member.is_leader){
    //   if (confirm("Are you sure you want to change the leader?")){
    //     this.api.change_leader(this.self_member.id, member_id, this.self_member.team_id)
    //     .subscribe(
    //       response => { console.log(response); this.get_team(); this.new_member = ''; },
    //       error => {console.log(error); alert("There was some error, please refresh the page and try again.")}
    //     )
    //   }
    // }
    alert("Not allowed, please contact us for any request.");
  }

  register() {
    if (this.selected_compi.is_group) {
      if (confirm("Are you sure you want to register as a team leader?")) {
        this.reg();
      } else {
        alert("Please contact your team leader to add you to the team")
      }
    } else {
      this.reg();
    }
  }

  reg() {
    this.api.compi_reg(this.selected_compi)
      .subscribe(
        response => {
          if (response['status'] == "User Not Found") {
            console.log(response);
            alert("There was some error, please try again after sometime")
          } else {
            if (response['status'] == "Successfully Registered"){
              this.selected_compi.registered = true;
            }
            alert(response['status']);
            this.get_team();
          }
        },
        error => {
          console.log(error);
          alert("There was some error, please try again after sometime.");
        }
      )
  }


}
