import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerDashComponent } from './influencer-dash.component';

describe('InfluencerDashComponent', () => {
  let component: InfluencerDashComponent;
  let fixture: ComponentFixture<InfluencerDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
