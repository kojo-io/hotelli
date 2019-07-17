
import { NewAmenityComponent } from './new-amenity.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('NewAmenityComponent', () => {
  let component: NewAmenityComponent;
  let fixture: ComponentFixture<NewAmenityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAmenityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
