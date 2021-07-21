import { Injectable } from '@angular/core';
import { Blog } from './dashboard/blog/blog';
import { Task } from './dashboard/home/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table, activity } from './dashboard/leaderboard/table/table';
import { Target } from './dashboard/home/target';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { Match, Participant, Player } from './dashboard/ipl/models';
import { Compi } from './dashboard/dash-competitions/dash-competitions.component';
import { TeamMember } from './dashboard/compi-details/compi-details.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  blogs: Blog[];
  public tasks: Task[];
  users_overall: Table;
  users_city: Table;
  college_overall: Table;
  college_state: Table;
  city_overall: Table;
  target: Target;
  activity: activity;
  // leaderboards: LeaderBoard[];
  // IPL data
  team: Player[];

  constructor(private http: HttpClient) { }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
  setBlogs(blogs: Blog[]) {
    this.blogs = blogs;
  }

  getTasks(rid: string): Observable<Task[]> {
    return this.http.get<Task[]>('https://api3.moodi.org/gettasks?rid=' + rid);
  }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>('https://api3.moodi.org/getblogs');
  }

  getWeeklyTarget(rid: string) {
    return this.http.get<Target>("https://api3.moodi.org/weeklytarget?rid=" + rid);
  }

  getLeaderboards(rid: string) {
    return this.http.get("https://api3.moodi.org/getleaderboard?rid=" + rid);
  }

  get_activity(rid: string) {
    return this.http.get<activity>("https://api3.moodi.org/getactivity?rid=" + rid);
  }

  set_leaderboards(response) {
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
    
  }

  get_details(rid: string) {
    return this.http.get("https://api3.moodi.org/get_ccp_details?rid=" + rid);
  }

  get_updates(rid: string) {
    return this.http.get("https://api3.moodi.org/get_ccp_updates?rid=" + rid);
  }

  add_task(task: Task) {
    return this.http.post("https://api3.moodi.org/addtask", {
      rid: localStorage.getItem("referral_code"),
      question: task.question,
      answer: task.answer,
    });
  }

  update_social(body) {
    return this.http.post('https://api3.moodi.org/update_social_details', body);
  }

  get_ipl_team(referral_code: string) {
    // if this.team
    return this.http.get<Player[]>('https://api3.moodi.org/get_ipl_team', { params: { user: referral_code } })
  }

  set_ipl_team(team: Player[]) {
    this.team = team;
  }

  get_match() {
    return this.http.get<Match[]>("https://api3.moodi.org/get_ipl_matches", { params: { user: localStorage.getItem('referral_code') } });
  }

  set_bid(player1: number, player2: number, player3: number, match: number) {
    var obj = {
      player1: player1,
      player2: player2,
      player3: player3,
      bid: match,
      user: localStorage.getItem('referral_code')
    }
    return this.http.post("https://api3.moodi.org/set_ipl_bid", obj);
  }

  get_ipl_leaderboard() {
    return this.http.get<Participant[]>("https://api3.moodi.org/get_ipl_leaderboard", { params: { user: localStorage.getItem('referral_code') } });
  }

  get_compis(genre: string, referral_code: string) {
    return this.http.get<Compi[]>("https://api3.moodi.org/get_my_compis", { params: { genre: genre, user: referral_code } });
  }

  compi_reg(compi: Compi){
    var obj = {
      compi: compi.id,
      user: localStorage.getItem('referral_code')
    }
    return this.http.post("https://api3.moodi.org/compireg", obj);
  }

  get_compi_details(compi_id: string){
    return this.http.get<Compi>("https://api3.moodi.org/compi_details", {params: {
      user: localStorage.getItem('referral_code'),
      compi_id: compi_id
    }});
  }

  get_team(compi_id: number){
    return this.http.get<TeamMember[]>('https://api3.moodi.org/get_team', { params :{ 
      compi_id: compi_id.toString(),
      mi_number: localStorage.getItem("mi_number")
    }})
  }

  add_member(self_id: number, mi_number: string, team_id: number, compi_id: number){
    return this.http.get<TeamMember[]>('https://api3.moodi.org/add_compi_member', { params :{ 
      leader: self_id.toString(),
      member: mi_number,
      compi_id: compi_id.toString(),
      team_id: team_id.toString(),
    }})
  }

  remove_member(user_id: number, team_id: number, method: string){
    return this.http.get<TeamMember[]>('https://api3.moodi.org/remove_compi_member', { params :{ 
      user_id: user_id.toString(),
      team_id: team_id.toString(),
      method: method,
    }})
  }

  change_leader(old_id: number, new_id: number, team_id: number){
    return this.http.get<TeamMember[]>('https://api3.moodi.org/change_compi_leader', { params :{ 
      old_id: old_id.toString(),
      new_id: new_id.toString(),
      team_id: team_id.toString(),
    }})
  }

  getCompiLeaderboards() {
    return this.http.get("https://api3.moodi.org/compi_leaderboard");
  }
  
  // Influencers APIs

  has_applied(){
    return this.http.get("https://api3.moodi.org/influencer_applied", {params: {"referral_id": localStorage.getItem("referral_code")}})
  }

  influencer_apply(insta_id, fb_id, linkedin_id, twitter_id, snapchat_id, youtube_id, categories){
    if (fb_id == undefined){
      fb_id = '';
    }
    if (linkedin_id == undefined){
      linkedin_id = '';
    }
    if (twitter_id == undefined){
      twitter_id = '';
    }
    if (snapchat_id == undefined){
      snapchat_id = '';
    }
    if (youtube_id == undefined){
      youtube_id = '';
    }
    var data = {
      insta_id: insta_id,
      fb_id: fb_id,
      linkedin_id: linkedin_id,
      twitter_id: twitter_id,
      snapchat_id: snapchat_id,
      youtube_id: youtube_id,
      category: categories,
      referral_code: localStorage.getItem('referral_code')
    }
    return this.http.post("https://api3.moodi.org/influencer_apply", data)
  }

  influencer_get_tasks(){
    return this.http.get<[]>("https://api3.moodi.org/influencer_tasks", {params: {"referral_code": localStorage.getItem("referral_code")}})
  }

  influencer_tasks(task_id, link){
    var data = {
      "referral_code": localStorage.getItem("referral_code"),
      'link': link,
      task_id: task_id.toString()
    }
    return this.http.post("https://api3.moodi.org/influencer_tasks_submit", data)
  }
}
