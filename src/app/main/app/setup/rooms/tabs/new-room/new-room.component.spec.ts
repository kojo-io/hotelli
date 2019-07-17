
import { NewRoomComponent } from './new-room.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('NewRoomComponent', () => {
  let component: NewRoomComponent;
  let fixture: ComponentFixture<NewRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
