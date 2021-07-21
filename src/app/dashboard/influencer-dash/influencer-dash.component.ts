import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Task } from '../home/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-dash',
  templateUrl: './influencer-dash.component.html',
  styleUrls: ['./influencer-dash.component.css']
})
export class InfluencerDashComponent implements OnInit {

  categories = [
    "Food",
    "Fashion and Lifestyle",
    "Travel",
    "Meme Page",
    "Art & Design",
    "Photography",
    "Speaking and literary arts",
    "Performing arts",
    "Music",
    "Personal Blog",
    "Motivational",
    "Fitness",
    "News and journalism",
  ]
  cat1;
  cat2;
  cat3;
  cat1_err;
  cat2_err;
  cat3_err;
  fb_id;
  insta_id;
  linkedin_id;
  youtube_id;
  twitter_id;
  snapchat_id;
  has_registered: string;
  curr_level = 'BRONZE';
  next_level = 'SILVER';
  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;
  profile_img: string = "";
  tasks: Task[] = [];
  score;


  constructor(private router: Router,private api: ApiService) {
    this.router.navigate(['/dashboard/']);
   }

  ngOnInit(): void {
    this.api.has_applied()
      .subscribe(
        response => {
          console.log(response);
          this.has_registered = response['status'];
          this.score = response['points'];
          if (this.has_registered == "Verified") {
            this.api.influencer_get_tasks()
              .subscribe(
                response => {
                  console.log(response);
                  response.forEach(item => {
                    this.tasks.push({
                      id: item['id'],
                      question: item["description"],
                      answer: '',
                    })
                  })
                },
                error => { console.log(error) }
              )
          }
        },
        error => { console.log(error) }
      );

    this.profile_img = localStorage.getItem('pic_url');
    if (localStorage.getItem('level') == 'level 2') {
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }

    this.progress = localStorage.getItem('progress');
    for (let i = parseFloat(this.progress); i < 100;) {
      this.progress_dot[Math.floor(i / 10)] = 0.5;
      i += 10;
    }
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');
  }

  post_answer(task) {
    this.api.influencer_tasks(task.id, task.answer)
    .subscribe(
      response => {console.log(response); this.tasks = this.tasks.filter(item => {return item.id !== task.id})},
      error => {console.log(error)}
    )
  }


  place_bid() {
    if (this.validate()) {
      this.api.influencer_apply(this.insta_id, this.fb_id, this.linkedin_id, this.twitter_id, this.snapchat_id, this.youtube_id, [this.cat1, this.cat2, this.cat3])
        .subscribe(
          response => {
            console.log(response); if (response['status'] == "Successfully Registered") {
              this.has_registered = "Registered";
            }
          },
          error => { console.log(error) }
        )
    }
  }

  validate() {
    if (this.insta_id == undefined) {
      alert("Please enter your Instagram handle")
      return false
    }
    if (this.insta_id.length < 1) {
      alert("Please enter a valid Instagram handle")
      return false
    }
    if (this.cat1 == undefined) {
      alert("Please select atleast 1 category")
      return false
    }
    if (this.cat2 === this.cat3) {
      if (this.cat2 != undefined) {
        alert("Categories selected must be unique")
        return false
      }
    }
    if (this.cat1 == this.cat3) {
      alert("Categories selected must be unique")
      return false
    }
    if (this.cat1 == this.cat2) {
      alert("Categories selected must be unique")
      return false
    }
    // console.log("True")
    return true
  }

}
