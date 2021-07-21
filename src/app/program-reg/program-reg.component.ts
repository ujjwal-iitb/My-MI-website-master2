import { Component, OnInit } from '@angular/core';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-program-reg',
  templateUrl: './program-reg.component.html',
  styleUrls: ['./program-reg.component.css']
})
export class ProgramRegComponent implements OnInit {

  fb_valid = '../../assets/svgs/redmark.svg';
  insta_valid = '../../assets/svgs/redmark.svg';
  linkedin_valid = '../../assets/svgs/redmark.svg';
  twitter_valid = '../../assets/svgs/redmark.svg';

  fb_id = '';
  insta_id = '';
  linkedin_id = '';
  twitter_id = '';
  ccp_text = 'PRE-REGISTER';
  iap_text = 'PRE-REGISTER';
  multicity_text = 'PRE-REGISTER';

  ccp_registered = '../../assets/svgs/right.svg';
  iap_registered = '../../assets/svgs/right.svg';
  multicity_registered = '../../assets/svgs/right.svg';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // if (localStorage.getItem('referral_code') == null){
    //   this.router.navigate(['/details']);
    // }
    if (localStorage.getItem('ccp_registered') == 'true') {
      this.ccp_registered = "../../assets/svgs/greentick.svg";
      this.ccp_text = "REGISTERED";
    }
    if (localStorage.getItem('iap_registered') == 'true') {
      this.iap_registered = "../../assets/svgs/greentick.svg";
      this.iap_text = "REGISTERED";
    }
    if (localStorage.getItem('multicity_registered') == 'true') {
      this.multicity_registered = "../../assets/svgs/greentick.svg";
      this.multicity_text = "REGISTERED";
    }
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function () {
      setTimeout(() => {
        $(".loader").fadeOut("slow");
      }, 1000);
    });
  }

  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }

  validate(field: string) {
    // console.log("Here");
    if (field == 'fb') {
      if ((this.fb_id.split('/').length > 3) && (this.fb_id.split('/')[2] == 'www.facebook.com')) {
        this.fb_valid = "../../assets/svgs/greentick.svg"
      }
    } else if (field == 'insta') {
      if ((this.insta_id.split('/').length > 3) && (this.insta_id.split('/')[2] == 'www.instagram.com')) {
        this.insta_valid = "../../assets/svgs/greentick.svg"
      }
    } else if (field == 'linkedin') {
      if ((this.linkedin_id.split('/').length > 3) && (this.linkedin_id.split('/')[2] == 'www.linkedin.com')) {
        this.linkedin_valid = "../../assets/svgs/greentick.svg"
      } else {
        // console.log(this.linkedin_id)
      }
    } else if (field == 'twitter') {
      if ((this.twitter_id.split('/').length > 3) && (this.twitter_id.split('/')[2] == 'www.twitter.com')) {
        this.twitter_valid = "../../assets/svgs/greentick.svg"
      }
    }
  }

  register(prog: string) {
    if (prog == 'ccp') {
      localStorage.setItem('ccp_registered', 'true');
      this.http.post('https://api3.moodi.org/prog_reg', {
        prog: 'ccp',
        ref_code: localStorage.getItem('referral_code'),
        fb_id: this.fb_id,
        insta_id: this.insta_id,
        linkedin_id: this.linkedin_id,
        twitter_id: this.twitter_id
      })
        .subscribe(
          response => {
            this.ccp_registered = "../../assets/svgs/greentick.svg";
            this.ccp_text = "REGISTERED";
          },
          error => { console.log(error); alert("There was some error, please try again later.") }
        )
    } else if (prog == 'iap') {
      this.http.post('https://api3.moodi.org/prog_reg', { prog: 'iap', ref_code: localStorage.getItem('referral_code') })
        .subscribe(
          response => {
            this.iap_registered = "../../assets/svgs/greentick.svg";
            this.iap_text = "REGISTERED";
            localStorage.setItem('iap_registered', 'true');
            this.next();
          },
          error => { console.log(error); alert("There was some error, please try again later.") }
        )
    } else if (prog == 'multicity') {
      localStorage.setItem('multicity_registered', 'true');
      this.http.post('https://api3.moodi.org/prog_reg', { prog: 'multicity', ref_code: localStorage.getItem('referral_code') })
        .subscribe(
          response => {
            this.multicity_registered = "../../assets/svgs/greentick.svg"
            this.multicity_text = "REGISTERED";
          },
          error => { console.log(error); alert("There was some error, please try again later.") }
        )
    }
  }

  next() {
    this.router.navigate(['/thankyou'])
  }

}
