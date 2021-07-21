import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCompetitionsComponent } from './dash-competitions.component';

describe('DashCompetitionsComponent', () => {
  let component: DashCompetitionsComponent;
  let fixture: ComponentFixture<DashCompetitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashCompetitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
