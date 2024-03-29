
import { FinancialComponent } from './financial.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('FinancialComponent', () => {
  let component: FinancialComponent;
  let fixture: ComponentFixture<FinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
