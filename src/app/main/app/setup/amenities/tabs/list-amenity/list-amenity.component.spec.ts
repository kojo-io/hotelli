import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmenityComponent } from './list-amenity.component';

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
