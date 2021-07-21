import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-championship-guidlines',
  templateUrl: './championship-guidlines.component.html',
  styleUrls: ['./championship-guidlines.component.css']
})
export class ChampionshipGuidlinesComponent implements OnInit {

  constructor(private router: Router) {
    this.router.navigate(['/dashboard/']);
   }

  ngOnInit(): void {
  }

  navigate(path: string){
    this.router.navigate([path])
  }

}
