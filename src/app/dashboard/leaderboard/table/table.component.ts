import { Component, OnInit, Input } from '@angular/core';
import { Table } from './table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() table: Table;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    // console.log(this.table);
    // console.log(this.table[0]);
    try {
      this.table[0].rank = '1';
      this.table[1].rank = '2';
      this.table[2].rank = '3';
      this.table[3].rank = '4';
      this.table[4].rank = '5';
    } catch (error) {
      
    }
  }

}
