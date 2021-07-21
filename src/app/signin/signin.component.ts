import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';

export interface temp {
  name: string,
  email: string,
  profile_url: string,
  gid: string
}


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  auth2: any;
  p: temp;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  error_email: 's';
  error_name: 's';
  name_border = '';
  email_border = '';
  error = false;
  showbox = false;

  constructor(private router: Router, private http: HttpClient,private _ngZone: NgZone, private cookieService: CookieService) {
    this.googleSDK();
    // console.log(localStorage.length);
    for(let i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      // console.log(key, value);
    }
   }

  ngOnInit(): void {
    if (localStorage.getItem('email') != null){
      this.router.navigate(['/details']);
    }
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function() {
      // alert('done loading'); 
      $(".loader").fadeOut("slow");
    });
    window.scrollTo(0, 0);
  }

  navigate(path: string){
    this.router.navigate(['/' + path]);
  }

  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '101329874701-9dopsntc52c4rbb5v1qragdrtamu4hua.apps.googleusercontent.com',
          // client_id: '82800887030-i6jaosf87baab4k5mf5j5e94rcfsgeca.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
   
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
   
  }

  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
   
        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());

        localStorage.setItem("email", profile.getEmail());
        localStorage.setItem("name", profile.getName());
        localStorage.setItem("gid", profile.getId());
        localStorage.setItem("pic_url", profile.getImageUrl());

        this.cookieService.set('email', localStorage.getItem('email'), 5000, '/', '.moodi.org');
        this.cookieService.set('name', localStorage.getItem('name'), 5000, '/', '.moodi.org');
        this.cookieService.set('gid', localStorage.getItem('gid'), 5000, '/', '.moodi.org');
        this.cookieService.set('pic_url', localStorage.getItem('pic_url'), 5000, '/', '.moodi.org');
        this.p = {
          email: profile.getEmail(),
          gid: profile.getId(),
          name: profile.getName(),
          profile_url: profile.getImageUrl(),
        }
        this.send_data(this.p);
      }, (error) => {
        // alert(JSON.stringify(error, undefined, 2));
        console.log(error);
        this._ngZone.run(() => {
          this.error = true;
        })
      }
    );
  }

  showForm() {
    if (!this.showbox)
      this.showbox=true;
    else
      this.showbox=false;
    console.log("Link Clicked!!");
  }

  error_submit(){
    // console.log(this.error_name);
    if ((this.error_name == null) || (this.error_name.length == 0)){
      // console.log('at error submit');
      this.name_border = 'solid red';
    }
    if (!(this.validateEmail(this.error_email)) || (this.error_email == null)){
      this.email_border = 'solid red';
      return
    }
    // console.log(this.validateEmail(this.error_email));
    localStorage.setItem("email", this.error_email);
    localStorage.setItem("name", this.error_name);
    localStorage.setItem("gid", this.error_email.substr(0, 25));
    localStorage.setItem("pic_url", 'error');

    this.cookieService.set('email', localStorage.getItem('email'), 5000, '/', '.moodi.org');
    this.cookieService.set('name', localStorage.getItem('name'), 5000, '/', '.moodi.org');
    this.cookieService.set('gid', localStorage.getItem('gid'), 5000, '/', '.moodi.org');
    this.cookieService.set('pic_url', localStorage.getItem('pic_url'), 5000, '/', '.moodi.org');
    this.p = {
      email: this.error_email,
      gid: this.error_email.substr(0, 25),
      name: this.error_name,
      profile_url: 'error',
    }
    this.send_data(this.p);    
  }

  send_data(profile){
    // console.log(this.p);
    this.http.post('https://api3.moodi.org/ccp_temp', profile)
    .subscribe(response => {
      if (response['status'] == "Already Exists"){
        localStorage.setItem('referral_code', response['referral_code'])
        this._ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
        return
      }
      this._ngZone.run(() => {
        this.router.navigateByUrl('/details')
      });
    },
    error => {
      // console.log("Failed: ", error);
    });
  }
  
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
