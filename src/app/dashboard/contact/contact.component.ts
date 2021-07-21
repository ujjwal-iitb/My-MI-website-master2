import { Component, OnInit, Output } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { EventEmitter } from 'protractor';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  toggle_navbar(){
    // console.log('toggle nav bar');
    // this.apiService.toggle();
  }

}
