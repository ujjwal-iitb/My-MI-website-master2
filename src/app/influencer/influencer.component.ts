import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { why_animation, works_animation, works_text, mworks_text } from '../ccp/animations';
declare var params: any, anim: any, lottie: any, params2: any, anim2: any;
declare var $: any;

@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.css'],
  animations: [
    why_animation,
    works_animation,
    works_text,
    mworks_text
  ]
})
export class InfluencerComponent implements OnInit {

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
  }

  goto(path: string){
    this.router.navigateByUrl('/' + path);
  }

  navigate(path: string){
    this.router.navigate(['/' + path]);
  }

  change_state(state: string){
    // console.log(state, 'state')
    if(state == 'left'){
      this.curr_state -= 1;
    } else{
      this.curr_state += 1;
    }
    if(this.curr_state < 1){
      this.curr_state += 70;
    }
    this.states[this.curr_state%7] = 'center';
    this.states[(this.curr_state - 1)%7] = 'left';
    this.states[(this.curr_state + 1)%7] = 'right';
  }

}
