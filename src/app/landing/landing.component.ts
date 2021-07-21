import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public el: ElementRef, private router: Router, private http: HttpClient, private cookieService: CookieService) {
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (localStorage.getItem('referral_code') !== null){
      this.registered = true;
      // this.router.navigate(['dashboard']);
    } else{
      this.registered = false;
    }
    params.container = document.getElementById('lottie');
    anim = lottie.loadAnimation(params);
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function() {
      setTimeout(() => {
        $(".loader").fadeOut("slow");
      }, 1000);
    });
    setTimeout(() => {
      $(".loader").fadeOut("slow");
    }, 2000);
    // console.log("here");
    // console.log(this.cookieService.getAll());
    if (localStorage.getItem('email') != null){
      if(!this.cookieService.check('email')){
        this.cookieService.set('email', localStorage.getItem('email'), 5000, '/', '.moodi.org');
        this.cookieService.set('name', localStorage.getItem('name'), 5000, '/', '.moodi.org');
        this.cookieService.set('gid', localStorage.getItem('gid'), 5000, '/', '.moodi.org');
        this.cookieService.set('pic_url', localStorage.getItem('pic_url'), 5000, '/', '.moodi.org');
      }
    }
    if (this.router.url.split('=')[1] != undefined){
      localStorage.setItem('rid', this.router.url.split('=')[1]);
      localStorage.setItem('rid_mi_code', this.router.url.split('=')[1]);
      // console.log(this.router.url.split('=')[1]);
    }
    // console.log(this.cookieService.getAll());
  }

  transform = '';
  sleeping_transform = '';
  logo_transform = '';
  ccp_transform = '';
  iap_transform = '';
  multi_transform = '';
  posY = 0;
  posX = 0;
  x = 0;
  y = 0;
  query_obj: any = {
    name: '',
    email: '',
    subject: '',
    content: ''
  }
  signup_display = 'block';
  name_border = 'none';
  email_border = 'none';
  subject_border = 'none';
  content_border = 'none';
  query_success = false;
  query_failure = false;
  registered: boolean;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if(window.innerWidth > 1200){
      this.posY = event.pageY;
      this.posX = event.pageX;
      if ((this.posY > 390) && (this.posY < 1100)){
        this.x = 10 * (this.posY - 745) / 355;
        this.y = 25 * (this.posX - 960) / 2000;
        this.transform = 'rotateY(' + this.y + 'deg) rotateX(' + this.x + 'deg)';
        this.sleeping_transform = 'translateX(' + Math.abs(this.y/20) + 'vw)';
      } else if ((this.posY > 1930) && (this.posY < 2530) && (this.posX > 1260)){ // x < 1919
        this.x = 10 * (this.posY - 2230) / 300;
        this.y = 10 * (this.posX - 1590) / 230;
        this.logo_transform = 'rotateY(' + this.y + 'deg) rotateX(' + this.x + 'deg)';
      } else if ((this.posY > 3630) && (this.posY < 4580) && (this.posX > 870)){
        // console.log('here');
        this.x = 5 * (this.posY - 4105) / 475;
        this.y = 5 * (this.posX - 1395) / 525;
        this.ccp_transform = 'rotateY(' + this.y + 'deg) rotateX(' + this.x + 'deg)';
      } else if ((this.posY > 4630) && (this.posY < 6050) && (this.posX > 750)){
        // console.log('here');
        this.x = 5 * (this.posY - 5340) / 710;
        this.y = 5 * (this.posX - 1335) / 585;
        this.iap_transform = 'rotateY(' + this.y + 'deg) rotateX(' + this.x + 'deg)';
      } else if ((this.posY > 6075) && (this.posY < 7255) && (this.posX > 870)){
        // console.log('here');
        this.x = 5 * (this.posY - 6665) / 590;
        this.y = 5 * (this.posX - 1395) / 525;
        this.multi_transform = 'rotateY(' + this.y + 'deg) rotateX(' + this.x + 'deg)';
      }
    }
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    // console.log(window.scrollY);
    if (window.scrollY > 3230){
      this.signup_display = 'none';
    } else{
      this.signup_display = 'block';
    }
  } 

  navigate(path: string){
    this.router.navigate(['/' + path]);
  }

  iap(){
    localStorage.setItem('iap_pre', 'true');
    this.router.navigate(['signup'])
  }

  goto(path: string){
    document.getElementById(path).scrollIntoView({behavior: "smooth"});
  }

  query(){
    var is_valid = true;
    this.name_border = 'none';
    this.email_border = 'none';
    this.subject_border = 'none';
    this.content_border = 'none';
    // console.log(this.query_obj.name);
    // console.log(this.query_obj.email);
    // console.log(this.query_obj.subject);
    // console.log(this.query_obj.content);
    if (this.query_obj.name == ''){
      is_valid = false;
      this.name_border = 'solid red';
    }
    if (!this.validateEmail(this.query_obj.email)){
      is_valid = false;
      this.email_border = 'solid red';
    }
    if (this.query_obj.content == ''){
      is_valid = false;
      this.content_border = 'solid red';
    }
    if (this.query_obj.subject == ''){
      is_valid = false;
      this.subject_border = 'solid red';
    }
    if (is_valid){
      this.http.post('https://api3.moodi.org/mymi_queries', this.query_obj)
      .subscribe(response => {
        // console.log(response);
        if (response == 'Success'){
          this.query_success = true;
        } else { this.query_failure = false; }
      });
      this.query_obj.name = '';
      this.query_obj.email = '';
      this.query_obj.subject = '';
      this.query_obj.content = '';
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  navbar(){
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  expand(){
    if(window.innerWidth<=600){
      
      let x = document.getElementById("drpdown");
      if(x.style.display==="") {
        x.style.display ="block";
      }else{
        x.style.display = x.style.display === "none" ? "block" : "none";
      }
    }
  }
}
