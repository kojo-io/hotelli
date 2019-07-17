
import { NewuserComponent } from './newuser.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('NewuserComponent', () => {
  let component: NewuserComponent;
  let fixture: ComponentFixture<NewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
