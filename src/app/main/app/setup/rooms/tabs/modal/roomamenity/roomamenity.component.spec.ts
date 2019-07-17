
import { RoomamenityComponent } from './roomamenity.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('RoomamenityComponent', () => {
  let component: RoomamenityComponent;
  let fixture: ComponentFixture<RoomamenityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomamenityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomamenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
