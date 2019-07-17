
import { NewRoomtypeComponent } from './new-roomtype.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('NewRoomtypeComponent', () => {
  let component: NewRoomtypeComponent;
  let fixture: ComponentFixture<NewRoomtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoomtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
