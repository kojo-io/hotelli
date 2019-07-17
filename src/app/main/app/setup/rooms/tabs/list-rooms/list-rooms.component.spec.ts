
import { ListRoomsComponent } from './list-rooms.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('ListRoomsComponent', () => {
  let component: ListRoomsComponent;
  let fixture: ComponentFixture<ListRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
