import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipGuidlinesComponent } from './championship-guidlines.component';

describe('ChampionshipGuidlinesComponent', () => {
  let component: ChampionshipGuidlinesComponent;
  let fixture: ComponentFixture<ChampionshipGuidlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionshipGuidlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipGuidlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
