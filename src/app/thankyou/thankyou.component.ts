import { Component, OnInit } from '@angular/core';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
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


  constructor(private router: Router, private sanitizer: DomSanitizer) {
    if (localStorage.getItem('referral_code') == null){
      if (localStorage.getItem('email') == null){
        this.router.navigate(['/signup'])
      } else{
        this.router.navigate(['details'])
      }
    }
    
    this.url += localStorage.getItem('referral_code');
    this.linkedin_url = sanitizer.bypassSecurityTrustResourceUrl('https://www.linkedin.com/sharing/share-offsite?url=' + this.url);
    this.facebook_url = sanitizer.bypassSecurityTrustResourceUrl('https://www.facebook.com/sharer/sharer.php?u=' + this.url);
    this.twitter_url = sanitizer.bypassSecurityTrustResourceUrl("http://twitter.com/share?text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Pre-register now and get a chance to win internships and free coupons.");
    this.mail_url = sanitizer.bypassSecurityTrustResourceUrl("mailto:?Subject=My%20Mood%20Indigo%20Portal&body=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Pre-register now and get a chance to win internships and free coupons.");
    this.platform = navigator.userAgent;
    
    this.iphone = this.platform.match(/(iPhone|iPad)/);
    this.android = this.platform.match(/Android/);

    if (this.android){
      this.web = false;
      this.whatsapp_url = sanitizer.bypassSecurityTrustResourceUrl("intent://send?phone=&text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Pre-register now and get a chance to win internships and free coupons." + "#Intent;package=com.whatsapp;scheme=whatsapp;end&text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Pre-register now and get a chance to win internships and free coupons.");
    }
    else if (this.iphone){
      this.web = false;
      this.whatsapp_url = sanitizer.bypassSecurityTrustResourceUrl("whatsapp://send?text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Pre-register now and get a chance to win internships and free coupons.");
    }
    else {
      this.whatsapp_url = "https://web.whatsapp.com/send?text=Hi guys\! Mood Indigo, IIT Bombay is back with its 50th edition and their all new College Connect Program is here\! I have joined the program, now it's your turn. Use this link for registration:" + this.url + " Pre-register now and get a chance to win internships and free coupons.";
    }
   }

  ngOnInit(): void {
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function() {
      setTimeout(() => {
        $(".loader").fadeOut("slow");
      }, 1000);
    });
  }

  navigate(path: string){
    this.router.navigate(['/' + path]);
  }

}
