import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-influencer-guidlines',
  templateUrl: './influencer-guidlines.component.html',
  styleUrls: ['./influencer-guidlines.component.css']
})
export class InfluencerGuidlinesComponent implements OnInit {

  constructor(private router: Router,) {
    this.router.navigate(['/dashboard/']);
   }

  ngOnInit(): void {
  }

}
