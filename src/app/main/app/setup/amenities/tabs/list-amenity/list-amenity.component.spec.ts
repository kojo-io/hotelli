
import { ListAmenityComponent } from './list-amenity.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('ListAmenityComponent', () => {
  let component: ListAmenityComponent;
  let fixture: ComponentFixture<ListAmenityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmenityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
