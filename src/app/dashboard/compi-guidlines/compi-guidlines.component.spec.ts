import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiGuidlinesComponent } from './compi-guidlines.component';

describe('CompiGuidlinesComponent', () => {
  let component: CompiGuidlinesComponent;
  let fixture: ComponentFixture<CompiGuidlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompiGuidlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiGuidlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
