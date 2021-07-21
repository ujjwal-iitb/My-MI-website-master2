import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerGuidlinesComponent } from './influencer-guidlines.component';

describe('InfluencerGuidlinesComponent', () => {
  let component: InfluencerGuidlinesComponent;
  let fixture: ComponentFixture<InfluencerGuidlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluencerGuidlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerGuidlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
