
import { ExtenddaysComponent } from './extenddays.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from 'q';

describe('ExtenddaysComponent', () => {
  let component: ExtenddaysComponent;
  let fixture: ComponentFixture<ExtenddaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtenddaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtenddaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
