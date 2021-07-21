import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { why_animation, works_animation, works_text, mworks_text } from '../ccp/animations';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
declare var $: any;

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
  animations: [
    why_animation,
    works_animation,
    works_text,
    mworks_text
  ]
})
export class CompetitionsComponent implements OnInit {

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
  overall;
  registered: Boolean;
  constructor(private router: Router, private apiService: ApiService) { 
    if (localStorage.getItem('referral_code') !== null){
      this.registered = true;
      // this.router.navigate(['dashboard']);
    } else{
      this.registered = false;
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    params2.container = document.getElementById('lottie2');
    anim2 = lottie.loadAnimation(params2);
    $(window).on('load', function() {
      $(".loader").fadeOut("slow");
      });
      // alert('done loading'); 
      setTimeout(() => {
        $('.ngo-list').liMarquee({
          direction: 'left',	
          loop:-1,			
          scrolldelay: 0,		
          scrollamount:120,	
          circular: true,
          drag: true			
        });	
        $('.testimonial-list').liMarquee({
          direction: 'left',	
          loop:-1,			
          scrolldelay: 0,		
          scrollamount:50,	
          circular: true,		
          drag: true			
        });
        // console.log("Initialized");
        // console.log('entry')
        
        $(".loader").fadeOut("slow");
      }, 1500);

      
    this.apiService.getCompiLeaderboards()
    .subscribe(
      response => {
        this.overall = {
          data: response['overall'],
          heading: "MI CHAMPIONSHIP"
        };
      },
      error => { console.log(error); }
    )
  }

  
  navigate(path: string){
    this.router.navigate(['/' + path]);
  }

  // change_state(state: string){
  //   // console.log(state, 'state')
  //   if(state == 'left'){
  //     this.curr_state -= 1;
  //   } else{
  //     this.curr_state += 1;
  //   }
  //   if(this.curr_state < 1){
  //     this.curr_state += 70;
  //   }
  //   this.states[this.curr_state%7] = 'center';
  //   this.states[(this.curr_state - 1)%7] = 'left';
  //   this.states[(this.curr_state + 1)%7] = 'right';
  // }

}
