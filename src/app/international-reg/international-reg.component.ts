import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import * as $ from 'jquery';
import '../../assets/js/sleeping2.js';

@Component({
  selector: 'app-international-reg',
  templateUrl: './international-reg.component.html',
  styleUrls: ['./international-reg.component.css']
})
export class InternationalRegComponent implements OnInit {

  college_err = 'none';
  state_err = 'none';
  city_err = 'none';
  dob_err = 'none';
  gender_err = 'none';
  yos_err = 'none';
  mob_err = 'none';
  ref_err = 'none';
  state: string = '';
  city: string = '';
  college = '';
  dob: Date;
  gender: string = 'initial';
  mob: string;
  ref: string;
  year_of_study: string = 'initial';
  complete = false;
  regexpNumber = new RegExp('^[+][0-9]{1,15}$');
  font = 'Avenir';

  user = {
    name: '',
    gender: '',
    email: '',
    mobile_number: '',
    dob: '',
    year_of_study: '',
    state: '',
    city: '',
    college: '',
    google_id: '',
    referred_by: '',
    pic_url: '',
    international: true,
  }

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    if (localStorage.getItem('referred_by') != null){
      this.user.referred_by = localStorage.getItem('referred_by');
      this.ref=localStorage.getItem('referred_by');;
    }
   }

  ngOnInit(): void {
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function() {
      // alert('done loading'); 
      setTimeout(() => {
        $(".loader").fadeOut("slow");
      }, 1000);
    });
    if (localStorage.getItem('email') == null){
      this.router.navigate(['/signup']);
    } else if (localStorage.getItem('referral_code') != null){
      this.router.navigate(['/registration']);
    }
    this.user.name = localStorage.getItem('name');
    this.user.email = localStorage.getItem('email');
    this.user.google_id = localStorage.getItem('gid');
    if (localStorage.getItem('referred_by') != null){
      this.user.referred_by = localStorage.getItem('referred_by');
    }
    this.user.pic_url = localStorage.getItem('pic_url');
    if ((this.user.name == null) || (this.user.email == null) || (this.user.google_id == null)){
      this.router.navigate(['/signup'])
    }
    for (let i = 0; i < document.getElementsByTagName('span').length; i++){
      document.getElementsByTagName('span')[i].setAttribute('font-family', 'Raleway');
    }
  }

  navigate(path: string){
    this.router.navigate(['/' + path]);
  }

  submit(){
    if (this.validate()){
      this.user.college = this.college;
      this.user.state = this.state;
      this.user.city = this.city;
      this.user.dob = this.get_date(this.dob);
      this.user.gender = this.gender;
      this.user.mobile_number = this.mob;
      this.user.year_of_study = this.year_of_study;
      this.user.referred_by = localStorage.getItem('rid');
      this.http.post('https://api3.moodi.org/adduser', this.user)
      .subscribe(
        response => {
          localStorage.setItem('referral_code', response.toString());
          if (localStorage.getItem('iap_pre') == 'true'){
            this.router.navigateByUrl('/registration');
          } else{
            this.router.navigate(['dashboard'])
          }
        },
        err => {console.log(err)}
      )
      this.cookieService.set('dob', this.college.toString(), 5000, '/', '.moodi.org');
      this.cookieService.set('gender', this.gender, 5000, '/', '.moodi.org');
      this.cookieService.set('mobile', this.mob, 5000, '/', '.moodi.org');
      this.cookieService.set('year_of_study', this.year_of_study, 5000, '/', '.moodi.org');
      this.cookieService.set('college_name', this.college, 5000, '/', '.moodi.org');
    }
  }

  get_date(date: Date): string{
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var result = '';
    if (d < 10){
      result += '0' + d;
    } else { result += d; }
    if (m < 10){
      result += '/0' + m;
    } else { result += '/' + m; }
    result += '/' + y;
    return result
  }

  validate(): Boolean {
    this.complete = true;
    this.college_err = 'none';
    this.state_err = 'none';
    this.city_err = 'none';
    this.dob_err = 'none';
    this.gender_err = 'none';
    this.yos_err = 'none';
    this.mob_err = 'none';
    this.ref_err = 'none';
    if(this.state == ''){
      this.complete = false;
      this.state_err = 'solid red';
    }
    if (this.city == '') {
      this.complete = false;
      this.city_err = 'solid red';
    }
    if (this.college == '') {
      this.complete = false;
      this.college_err = 'solid red';
    }
    if (this.dob == undefined) {
      this.complete = false;
      this.dob_err = 'solid red';
    }
    if (this.year_of_study == 'initial') {
      this.complete = false;
      this.yos_err = 'solid red';
    }
    if (!this.regexpNumber.test(this.mob)){
      this.complete = false;
      this.mob_err = 'solid red';
    }
    if (this.gender == 'initial'){
      this.complete = false;
      this.gender_err = 'solid red';
    }
    return this.complete;
  }

}
