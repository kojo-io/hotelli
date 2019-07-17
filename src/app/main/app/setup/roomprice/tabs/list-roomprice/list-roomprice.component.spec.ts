
import { ListRoompriceComponent } from './list-roomprice.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

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
