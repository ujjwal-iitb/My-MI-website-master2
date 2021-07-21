import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalRegComponent } from './international-reg.component';

describe('InternationalRegComponent', () => {
  let component: InternationalRegComponent;
  let fixture: ComponentFixture<InternationalRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
