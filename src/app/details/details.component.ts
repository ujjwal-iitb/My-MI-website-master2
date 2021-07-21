import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Event } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';

export interface Value {
  name: string
}
export interface College {
  name: string,
  id: number
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class DetailsComponent implements OnInit {

  college_err = 'none';
  state_err = 'none';
  city_err = 'none';
  dob_err = 'none';
  gender_err = 'none';
  yos_err = 'none';
  mob_err = 'none';
  ref_err = 'none';

  state_list: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi/U.T./Other',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Orissa',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  ]
  city_list: string[];
  college_list: College[];
  college_query = '';
  college_query_list: College[];
  city_disabled = true;
  college_disabled = true;
  state: string = 'initial';
  city: string = 'initial';
  college = 'initial';
  initial_college = 0;
  dob: Date;
  gender: string = 'initial';
  mob: string;
  ref: string;
  year_of_study: string = 'initial';
  complete = false;
  regexpNumber = new RegExp('^[+ 0-9]{10}$');
  font = 'Avenir';

  user = {
    name: '',
    gender: '',
    email: '',
    mobile_number: '',
    dob: '',
    year_of_study: '',
    college: 0,
    google_id: '',
    referred_by: '',
    pic_url: '',
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

  get_cities(par: any){
    this.state_err = 'none';
    this.city_list = [];
    // console.log(par.value);
    this.http.get<Value[]>('https://api3.moodi.org/city/', { params: { state: par.value } })
    .subscribe(response => {
      response.forEach(element => {
        this.city_list.push(element.name);
      });
      this.city_list = this.city_list.sort()
      // console.log(this.city_list);
      this.city_disabled = false;
    });
  }

  get_colleges(par: any){
    this.city_err = 'none';
    this.college_list = [];
    // console.log(par.value);
    this.http.get<College[]>('https://api3.moodi.org/college/', { params: { city: par.value } })
    .subscribe(response => {
      this.college_query_list = [];
      response.forEach(element => {
        this.college_list.push(element);
        // console.log(element);
      });
      // console.log('sorting');
      this.college_list = this.college_list.sort((a, b) => {
        if (a.name > b.name){
          return 1;
        } else {
          return -1;
        }
      });
      this.college_query_list = this.college_list;
      // console.log(this.college_list);
      this.college_disabled = false;
    });
  }

  submit(){
    if (this.validate()){
      // console.log(this.college_list);
      if (this.college_list.filter(elem => elem.name == this.college_query).length == 0){
        // console.log('asdfasdfasf');
        alert("Please select a college from the drop-down. If you can't find your college, choose 'Other'")
        return;
      }
      this.college = this.college_list.filter(elem => elem.name == this.college_query)[0].id.toString();
      // console.log(this.college)
      this.user.college = Number(this.college);
      this.user.dob = this.get_date(this.dob);
      this.user.gender = this.gender;
      // console.log(this.gender);
      this.user.mobile_number = this.mob;
      this.user.year_of_study = this.year_of_study;
      this.user.referred_by = localStorage.getItem('rid');
      this.http.post('https://api3.moodi.org/adduser', this.user)
      .subscribe(
        response => {
          // console.log(response);
          localStorage.setItem('referral_code', response.toString());
          if (localStorage.getItem('iap_pre') == 'true'){
            this.router.navigateByUrl('/registration');
          } else{
            this.router.navigate(['dashboard'])
          }
        },
        err => {console.log(err)}
      )
      this.cookieService.set('college_id', this.college.toString(), 5000, '/', '.moodi.org');
      this.cookieService.set('dob', this.college.toString(), 5000, '/', '.moodi.org');
      this.cookieService.set('gender', this.gender, 5000, '/', '.moodi.org');
      this.cookieService.set('mobile', this.mob, 5000, '/', '.moodi.org');
      this.cookieService.set('year_of_study', this.year_of_study, 5000, '/', '.moodi.org');
      var college_name = this.college_list.find(elem => elem.id == Number(this.college)).name;
      this.cookieService.set('college_name', college_name, 5000, '/', '.moodi.org');
    }
  }

  test(){
    // console.log(this.college_query);
    this.college_query_list = this.get_list(this.college_query);
    // console.log(this.college_query_list);
  }

  get_list(query){
    return this.college_list.filter(function (str) {return str.name.toLowerCase().includes(query.toLowerCase())});
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
    // console.log(this.get_date(this.dob));
    // console.log(this.college)
    this.college_err = 'none';
    this.state_err = 'none';
    this.city_err = 'none';
    this.dob_err = 'none';
    this.gender_err = 'none';
    this.yos_err = 'none';
    this.mob_err = 'none';
    if(this.state == 'initial'){
      this.complete = false;
      this.state_err = 'solid red';
    } else if (this.city == 'initial') {
      this.complete = false;
      this.city_err = 'solid red';
      // console.log("Here2");
    } else if (this.college_query == '') {
      this.complete = false;
      // console.log("Here3");
      this.college_err = 'solid red';
    }
    if (this.dob == undefined) {
      this.complete = false;
      // console.log("Here4");
      this.dob_err = 'solid red';
    }
    if (this.year_of_study == 'initial') {
      this.complete = false;
      // console.log("Here5");
      this.yos_err = 'solid red';
    }
    if (!this.regexpNumber.test(this.mob)){
      this.complete = false;
      // console.log("Here6");
      // console.log(this.mob);
      this.mob_err = 'solid red';
    }
    if (this.gender == 'initial'){
      this.complete = false;
      // console.log("Here7");
      this.gender_err = 'solid red';
    }
    return this.complete;
  }

}
