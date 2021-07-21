import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HostListener } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DriverProvider } from 'protractor/built/driverProviders';
import { ApiService } from 'src/app/api.service';
import { Player } from '../ipl/models';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'] ,
  animations: [
    trigger('expand', [
      state('initial', style({
        height: '0vw',
        opacity: '0',
        "z-index": "0",
        position: "relative",
      })),
      state('final', style({
        opacity: '1' ,
        height: '2.5vw', // For three -> 7vw perfect
        "z-index": "0",
        position: "relative",
      })),
      state('mfinal', style({
        opacity: '1' ,
        height: '7.5vw', // For three -> 22.5vw perfect
        "z-index": "0",
        position: "relative",
      })),
      transition('*=>*', animate('300ms')),
    ]),
  ]
})
export class SideNavComponent implements OnInit {
  screenHeight: number;
  screenWidth: number;
  menu: boolean = true;
  show_ipl: boolean = false;
  hover: boolean = true ;
  hover2: boolean =true;
  currentState = 'initial';
  currentState2 = 'initial';
  nav_stat = 'clicked'
  @Input() clicked: boolean;
  // @HostListener('window:resize', ['$event'])
  //   getScreenSize(event?) {        
  //         this.screenWidth = window.innerWidth;
  //         if(this.screenWidth<=600){
  //           this.menu = true;
  //         }
  //         else{
  //           this.menu= true;
  //         }
  //   }
  constructor(private route:ActivatedRoute,private router: Router, private http: HttpClient, private api: ApiService) {
    // this.getScreenSize();
    // this.menu = true;
          // if(this.screenWidth<=600){
          //   this.menu = true;
          // }
          // else{
          //   this.menu= true;
          // }
   }
  ngOnInit(): void {
    // this.http.get<Player[]>('https://api3.moodi.org/get_ipl_team', {params: {user: localStorage.getItem('referral_code')}})
    // .subscribe(
    //   response => {
    //     this.show_ipl = true;
    //     // this.api.set_ipl_team(response);
    //     localStorage.setItem('ipl_team', JSON.stringify(response))
    //     // console.log(response)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }
 
  navigate(path: string){
    if (window.innerWidth <= 600){
      this.menu = false;
    }
    this.router.navigate(['/dashboard/' + path]);
  }

  ngOnChanges(){
    // console.log('at side nav on changes');
    if (window.innerWidth < 600){
      if (this.nav_stat == 'clicked'){
        this.nav_stat = 'unclicked';
      } else{
        this.menu = false;
      }
    }
  }

  nav_click(){
    this.nav_stat = "clicked"
  }
  guide_drop(){
    this.hover=!this.hover 
  }
  leader_drop(){
    this.hover2=!this.hover2
  }
  changeState() {
    if (window.innerWidth < 700){
      this.currentState = this.currentState === 'initial' ? 'mfinal' : 'initial';
    } else{
      this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    }
  }
  changeState2() {
    if (window.innerWidth < 700){
      this.currentState2 = this.currentState2 === 'initial' ? 'mfinal' : 'initial';
    } else{
      this.currentState2 = this.currentState2 === 'initial' ? 'final' : 'initial';
    }
  }
}
