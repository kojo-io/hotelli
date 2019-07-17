
import { NewguestComponent } from './newguest.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('NewguestComponent', () => {
  let component: NewguestComponent;
  let fixture: ComponentFixture<NewguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
