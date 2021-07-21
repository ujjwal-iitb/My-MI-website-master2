import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IplLeaderboardComponent } from './ipl-leaderboard.component';

describe('IplLeaderboardComponent', () => {
  let component: IplLeaderboardComponent;
  let fixture: ComponentFixture<IplLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IplLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IplLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
