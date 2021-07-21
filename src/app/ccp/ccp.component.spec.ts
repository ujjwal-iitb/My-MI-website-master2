import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpComponent } from './ccp.component';

describe('CcpComponent', () => {
  let component: CcpComponent;
  let fixture: ComponentFixture<CcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
