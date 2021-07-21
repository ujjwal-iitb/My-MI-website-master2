import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-iap',
  templateUrl: './iap.component.html',
  styleUrls: ['./iap.component.css']
})
export class IapComponent implements OnInit {


  college_err = 'none';
  city_err = 'none';
  mob_err = 'none';
  email_err = 'none';
  name_err = 'none';
  city: string = 'initial';
  college = 'initial';
  mob: string;
  name: string;
  email: string;
  td_installations: Boolean = false;
  interactive: Boolean = false;
  fine_arts: Boolean = false;
  aerial_installations: Boolean = false;
  profession: string = 'student'

  registered: Boolean;
  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.getItem('referral_code') !== null) {
      this.registered = true;
      // this.router.navigate(['dashboard']);
    } else {
      this.registered = false;
    }
  }

  submit() {
    console.log(this.name, this.email, this.mob, this.city, this.college, this.profession, this.td_installations, this.interactive, this.aerial_installations, this.fine_arts);
    if (this.validate()){
      // Send data
      var obj = {
        name: this.name,
        email: this.email,
        mobile_number: this.mob,
        college: this.college,
        city: this.city,
        profession: this.profession,
        td_installations: this.td_installations,
        aerial_installations: this.aerial_installations,
        interactive: this.interactive,
        fine_arts: this.fine_arts,
      }
      this.http.post('https://api3.moodi.org/iapreg', obj)
      .subscribe(
        response => {console.log(response); alert("Registration Successful")},
        error => {console.log(error)}
      )
    }
  }

  validate(){
    this.name_err = 'none';
    this.email_err = 'none';
    this.mob_err = 'none';
    this.city_err = 'none';
    this.college_err = 'none';
    var validation = true;
    if ((this.name == null) || (this.name.length < 2)){
      this.name_err = 'solid red';
      validation = false;
    }
    if (!this.validateEmail(this.email)){
      this.email_err = 'solid red';
      validation = false;
    }
    if ((this.mob == null) || (this.mob.length < 10)){
      this.mob_err = 'solid red';
      validation = false;
    }
    if ((this.city == null) || (this.city.length < 2)){
      this.city_err = 'solid red';
      validation = false;
    }
    if ((this.college == null) || (this.college.length < 2)){
      this.college_err = 'solid red';
      validation = false;
    }
    if (!this.td_installations && !this.aerial_installations && !this.interactive && !this.fine_arts){
      alert("Please select at least one activity you are interested in.");
      validation = false;
    }
    return validation;
  }

  validateEmail(email): Boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  radio(value) {
    console.log(value);
    this.profession = value
  }

  checkbox(value) {
    console.log(value);
    if (value == '3d-installations') {
      this.td_installations = !this.td_installations;
    } else if (value == 'interactive') {
      this.interactive = !this.interactive;
    } else if (value == 'fine-arts') {
      this.fine_arts = !this.fine_arts;
    } else {
      this.aerial_installations = !this.aerial_installations;
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.college = localStorage.getItem('college');
    this.city = localStorage.getItem('city');
    this.mob = localStorage.getItem('mobile_number');
    $(window).on('load', function () {
      $(".loader").fadeOut("slow");
    });
    setTimeout(() => {
      $('.ngo-list').liMarquee({
        direction: 'left',
        loop: -1,
        scrolldelay: 0,
        scrollamount: 120,
        circular: true,
        drag: true
      });
      $('.testimonial-list').liMarquee({
        direction: 'left',
        loop: -1,
        scrolldelay: 0,
        scrollamount: 50,
        circular: true,
        drag: true
      });

      $(".loader").fadeOut("slow");
    }, 1500);
  }


  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }

  goto(path: string){
    document.getElementById(path).scrollIntoView({behavior: "smooth"});
  }
}
