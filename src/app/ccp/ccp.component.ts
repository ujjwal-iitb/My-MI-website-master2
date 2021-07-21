import { Component, OnInit, AfterViewInit, ViewEncapsulation, HostListener } from '@angular/core';
import { why_animation, works_animation, works_text, mworks_text } from './animations'
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
declare var $: any;
// import * as $ from 'jquery';
// import '../../assets/Smooth-Marquee-like-Content-Scroller-Plugin-For-jQuery-limarquee/js/jquery.liMarquee.js';

@Component({
  selector: 'app-ccp',
  templateUrl: './ccp.component.html',
  styleUrls: ['./ccp.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    why_animation,
    works_animation,
    works_text,
    mworks_text
  ]
})
export class CcpComponent implements OnInit {


  states = [
    'center',
    'right',
    'right',
    'right',
    'left',
    'left',
    'left',
  ]
  curr_state = 70;
  registered: Boolean;

  constructor(private router: Router) {
    if (localStorage.getItem('referral_code') !== null) {
      this.registered = true;
      // this.router.navigate(['dashboard']);
    } else {
      this.registered = false;
    }
  }

  ngOnInit(): void {
    // Word Animation 
    var words = document.getElementsByClassName('word');
    var wordArray: any = [];
    var currentWord = 0;

    words[currentWord].setAttribute("style", "opacity :1");
    for (var i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    function changeWord() {

      var cw: string = wordArray[currentWord];
      var nw = <any>((currentWord == words.length - 1) ? wordArray[0] : wordArray[currentWord + 1]);
      for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;

        animateLetterIn(nw, i);
      }

      currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw: any, i: number) {
      setTimeout(function () {
        cw[i].className = 'letter out';
        cw[i].parentElement.style.opacity = 1;

      }, i * 80);
    }

    function animateLetterIn(nw: any, i: number) {
      setTimeout(function () {
        nw[i].className = 'letter in';

      }, 340 + (i * 80));
    }

    function splitLetters(word: Element) {
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);


    window.scrollTo(0, 0);
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function () {
      $(".loader").fadeOut("slow");
    });
    // alert('done loading'); 
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
      // console.log("Initialized");
      // console.log('entry')

      $(".loader").fadeOut("slow");
    }, 1500);
  }

  goto(path: string) {
    this.router.navigateByUrl('/' + path);
  }

  navigate(path: string) {
    this.router.navigate(['/' + path]);
  }

  change_state(state: string) {
    // console.log(state, 'state')
    if (state == 'left') {
      this.curr_state -= 1;
    } else {
      this.curr_state += 1;
    }
    if (this.curr_state < 1) {
      this.curr_state += 70;
    }
    this.states[this.curr_state % 7] = 'center';
    this.states[(this.curr_state - 1) % 7] = 'left';
    this.states[(this.curr_state + 1) % 7] = 'right';
  }

  open(event: { target: any; }, index: string | number) {
    // console.log("Function Worked");
    var element = event.target;
    element.classList.toggle("active");

    //console.log(this.data[index].isActive);
    //console.log(typeof panel.style.maxHeight);
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      // console.log("InsideIF");
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      // console.log("Inside Else");
    }
    // console.log("EndofFunction")
  }


  //for the dynamic counter - Sarthak
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event['Window']);

    var y = document.querySelector('.num1')?.getBoundingClientRect().bottom;
    console.log(y)
    if (y) {
      var y_new = y;
    }// } else {
    //   y_new = 8000;
    // }

    // console.log(window.pageYOffset)
    if (600 > y_new && !this.scrolling) {

      this.citiesstop = setInterval(() => {
        this.cities_final = Math.floor(this.cities_final / 10) * 10;
        this.cities += 3;
        if (this.cities == this.cities_final) { clearInterval(this.citiesstop); }
      }, 10)

      this.collegesstop = setInterval(() => {
        this.col_final = Math.floor(this.col_final / 10) * 10
        this.colleges += 20;
        if (this.colleges == this.col_final) {

          clearInterval(this.collegesstop);
        }
      }, 10)



      this.membersstop = setInterval(() => {
        this.members_final = Math.floor(this.members_final / 100) * 100
        this.members += 200;
        if (this.members == this.members_final) {

          clearInterval(this.membersstop);
        }
      }, 10);
      this.scrolling = true;

    }

  }
  cities: number = 0;
  cities_final: number = 544;
  colleges: number = 0;
  col_final: number = 2000;
  members: number = 0;
  members_final: number = 25000;
  citiesstop: any;
  collegesstop: any;
  membersstop: any;
  scrolling: boolean = false;
}
