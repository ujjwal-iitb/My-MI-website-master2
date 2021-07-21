import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerLeaderboardComponent } from './influencer-leaderboard.component';

describe('InfluencerLeaderboardComponent', () => {
  let component: InfluencerLeaderboardComponent;
  let fixture: ComponentFixture<InfluencerLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
