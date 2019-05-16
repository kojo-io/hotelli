import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsetupComponent } from './taxsetup.component';

describe('TaxsetupComponent', () => {
  let component: TaxsetupComponent;
  let fixture: ComponentFixture<TaxsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
