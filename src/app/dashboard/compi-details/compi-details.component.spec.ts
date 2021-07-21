import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiDetailsComponent } from './compi-details.component';

describe('CompiDetailsComponent', () => {
  let component: CompiDetailsComponent;
  let fixture: ComponentFixture<CompiDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompiDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
