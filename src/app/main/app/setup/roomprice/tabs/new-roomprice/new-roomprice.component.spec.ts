import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoompriceComponent } from './new-roomprice.component';

describe('NewRoompriceComponent', () => {
  let component: NewRoompriceComponent;
  let fixture: ComponentFixture<NewRoompriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoompriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoompriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
