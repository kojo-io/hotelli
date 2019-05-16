import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoompriceComponent } from './roomprice.component';

describe('RoompriceComponent', () => {
  let component: RoompriceComponent;
  let fixture: ComponentFixture<RoompriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoompriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoompriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
