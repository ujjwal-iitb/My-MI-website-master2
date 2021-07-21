import { Component, OnInit, Input } from '@angular/core';
import { Table } from './table';

@Component({
  selector: 'app-table2',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent2 implements OnInit {
  @Input() table: Table;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(this.table)
  }

}
