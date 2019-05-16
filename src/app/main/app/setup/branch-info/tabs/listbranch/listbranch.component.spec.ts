import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbranchComponent } from './listbranch.component';

describe('ListbranchComponent', () => {
  let component: ListbranchComponent;
  let fixture: ComponentFixture<ListbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
