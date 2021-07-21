import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  score: string;
  curr_level = 'BRONZE';
  next_level = 'SILVER';

  constructor() { }

  ngOnInit(): void {
    this.score = localStorage.getItem('score');
    if (localStorage.getItem('level') == 'level 2'){
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
  }

}
