import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListguestComponent } from './listguest.component';

describe('ListguestComponent', () => {
  let component: ListguestComponent;
  let fixture: ComponentFixture<ListguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
