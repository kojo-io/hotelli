
import { FacilityitemsComponent } from './facilityitems.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('FacilityitemsComponent', () => {
  let component: FacilityitemsComponent;
  let fixture: ComponentFixture<FacilityitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
