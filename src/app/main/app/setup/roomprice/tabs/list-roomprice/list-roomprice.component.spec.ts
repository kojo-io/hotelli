import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoompriceComponent } from './list-roomprice.component';

describe('ListRoompriceComponent', () => {
  let component: ListRoompriceComponent;
  let fixture: ComponentFixture<ListRoompriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRoompriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoompriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
