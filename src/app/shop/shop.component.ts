import { Component, OnInit } from '@angular/core';
// import { why_animation, works_animation, works_text, mworks_text } from './animations'
import { Router } from '@angular/router';
declare var lottie: any, params2: any, anim2: any;
import '../../assets/js/sleeping2.js';
declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
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
