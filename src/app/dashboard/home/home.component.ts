import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Task, UploadBlog } from './task';
import { Blog } from '../blog/blog';
import { ApiService } from 'src/app/api.service';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Target } from './target';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: Task[];
  blogs: Blog[];
  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;
  target: Target;
  url = 'https://my.moodi.org/?rid=';
  linkedin_url = null;
  whatsapp_url = null;
  twitter_url = null;
  facebook_url = null;
  mail_url = null;
  platform = '';
  web = true;
  iphone = null;
  android = null;
  curr_level = 'BRONZE';
  next_level = 'SILVER';

  profile_img: string = "";

  constructor(private router: Router, private apiService: ApiService, private fb:FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.profile_img = localStorage.getItem('pic_url');
    if (localStorage.getItem('level') == 'level 2'){
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
    // console.log(this.apiService.tasks)
    if (this.apiService.tasks == null){
      this.apiService.getTasks(localStorage.getItem('referral_code'))
      .subscribe(data => {
        // console.log(data)
        this.tasks = data;
        this.apiService.setTasks(data);
      },
        error => {console.log(error)},
        // () => {console.log("Yaha");}
      );
    } else {
      this.tasks = this.apiService.tasks;
    }

    if (this.apiService.blogs == null){
      this.apiService.getBlogs()
      .subscribe(data => {
        // console.log(data);
        data.reverse();
        data.forEach(element => {
          element.pic_url = 'https://api3.moodi.org' + element.pic_url;
          // console.log(element.pic_url)
        });
        this.blogs = data.filter((elem) => {return elem.is_mi;});
        this.apiService.setBlogs(data);
      },
        error => {console.log(error)},
        // () => {console.log("Yaha");}
      );
    } else {
      this.blogs = this.apiService.blogs.filter((elem) => {return elem.is_mi;});
    }
    if (this.apiService.target == null){
      this.apiService.getWeeklyTarget(localStorage.getItem('referral_code'))
      .subscribe(
        response => {
          this.target = response;
          this.apiService.target = response;
        },
        error => {console.log(error)}
      )
    } else {
      this.target = this.apiService.target;
    }

    this.progress = localStorage.getItem('progress');
    for (let i = parseFloat(this.progress); i < 100;){
      this.progress_dot[Math.floor(i/10)] = 0.5;
      i += 10;
    }
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');
    this.set_urls();
  }
  showBlog(){
    this.router.navigate(['blog']);
  }

  post_answer(task: Task){
    this.apiService.add_task(task)
    .subscribe(
      response => {
        // console.log(response);
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
      },
      error => { console.log(error) }
    )
  }

  set_urls(){ 
    this.url += localStorage.getItem('referral_code');
    this.linkedin_url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.linkedin.com/sharing/share-offsite?url=' + this.url);
    this.facebook_url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.facebook.com/sharer/sharer.php?u=' + this.url);
    this.twitter_url = this.sanitizer.bypassSecurityTrustResourceUrl("http://twitter.com/share?text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Register now and get a chance to win internships and free coupons.");
    this.mail_url = this.sanitizer.bypassSecurityTrustResourceUrl("mailto:?Subject=My%20Mood%20Indigo%20Portal&body=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Register now and get a chance to win internships and free coupons.");
    this.platform = navigator.userAgent;
    
    this.iphone = this.platform.match(/(iPhone|iPad)/);
    this.android = this.platform.match(/Android/);

    if (this.android){
      this.web = false;
      this.whatsapp_url = this.sanitizer.bypassSecurityTrustResourceUrl("intent://send?phone=&text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Register now and get a chance to win internships and free coupons." + "#Intent;package=com.whatsapp;scheme=whatsapp;end&text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Register now and get a chance to win internships and free coupons.");
    }
    else if (this.iphone){
      this.web = false;
      this.whatsapp_url = this.sanitizer.bypassSecurityTrustResourceUrl("whatsapp://send?text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Register now and get a chance to win internships and free coupons.");
    }
    else {
      this.whatsapp_url = "https://web.whatsapp.com/send?text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Register now and get a chance to win internships and free coupons.";
    }
  }

  toggle_navbar(){
    // console.log('toggle nav bar');
  }
}
