
import { RoompriceComponent } from './roomprice.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

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
