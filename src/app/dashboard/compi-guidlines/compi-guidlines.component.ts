import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compi-guidlines',
  templateUrl: './compi-guidlines.component.html',
  styleUrls: ['./compi-guidlines.component.css']
})
export class CompiGuidlinesComponent implements OnInit {

  constructor(private router: Router,) {
    this.router.navigate(['/dashboard/']);
   }


  ngOnInit(): void {
  }

  navigate(path: string){
    this.router.navigate([path])
  }

}
