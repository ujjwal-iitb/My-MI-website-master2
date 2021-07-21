import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRegComponent } from './program-reg.component';

describe('ProgramRegComponent', () => {
  let component: ProgramRegComponent;
  let fixture: ComponentFixture<ProgramRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
