
import { RoomtypeComponent } from './roomtype.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('RoomtypeComponent', () => {
  let component: RoomtypeComponent;
  let fixture: ComponentFixture<RoomtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
