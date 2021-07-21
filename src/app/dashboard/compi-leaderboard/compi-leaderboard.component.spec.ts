import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiLeaderboardComponent } from './compi-leaderboard.component';

describe('CompiLeaderboardComponent', () => {
  let component: CompiLeaderboardComponent;
  let fixture: ComponentFixture<CompiLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompiLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
